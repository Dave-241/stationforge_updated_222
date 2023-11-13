"use client";

import React, { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  addDoc,
  getDocs,
} from "firebase/firestore"; // Import necessary Firebase modules
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./post";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/fire_base_config";
import { useProfile_Context } from "../utils/profile_context";
import Post_preloader from "./post_preloader";
import { useSearchParams } from "next/navigation";

const Post_wrap = () => {
  const [posts, setPosts] = useState([]);
  const [comment_disabled, setcomment_disabled] = useState(true);

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Get the current user (if needed)
  const auth = getAuth();

  const { setfrom }: any = useProfile_Context();

  const [post_loading, setpost_loading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, "posts");
    const col_qery = query(
      colRef,
      orderBy("pinned", "desc"),
      orderBy("createdAt", "desc"),
    );
    // Fetch the posts and listen for changes in the collection
    onSnapshot(col_qery, (querySnapshot) => {
      setpost_loading(true);
      const postArray: any = [];
      querySnapshot.forEach((doc) => {
        const postId = doc.id;
        const postData = doc.data();
        const usersCollectionRef = collection(db, "users");

        const imagesCollectionRef = collection(db, "posts", postId, "images");
        const likesCollectionRef = collection(db, "posts", postId, "likes");
        const commentsCollectionRef = collection(
          db,
          "posts",
          postId,
          "comments",
        );

        const pinnedCollectionRef = collection(db, "posts", postId, "pinned");
        const createdAt = postData.createdAt.toDate(); // Convert Firebase Timestamp to JavaScript Date

        const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
        const exactTime = format(createdAt, "h a"); // Format the time to "2 pm" format

        const postWithSubcollections: any = {
          postId,
          postData,
          images: [],
          trimmedimages: [],
          comments: [{}],
          liked: false,
          likesCount: 0,
          avatar: "",
          comment_username: "",
          trimmedDescription: "", // Initialize the trimmed description
          timeAgo, // Add the timeAgo property
          exactTime, // Add the exactTime property
          order: false, // this classifies the order of the post
        };

        // for trimming the text
        // Trim the description
        const postData_description = doc.data().description;
        if (postData_description.length > 250) {
          postWithSubcollections.trimmedDescription =
            postData_description.slice(0, 250) + "...";
        } else {
          postWithSubcollections.trimmedDescription = postData_description;
        }

        onSnapshot(likesCollectionRef, (likesSnapshot) => {
          postWithSubcollections.likesCount = likesSnapshot.size;
        });

        // Fetch images from the "images" subcollection
        onSnapshot(imagesCollectionRef, (imageSnapshot) => {
          const imagesArray: any = [];
          imageSnapshot.forEach((imageDoc: any) => {
            imagesArray.push(imageDoc.data());
          });
          postWithSubcollections.images = imagesArray;
          if (imagesArray.length >= 4) {
            const trimmedLinks = imagesArray.slice(0, 4);
            postWithSubcollections.trimmedimages = trimmedLinks;
          } else {
            postWithSubcollections.trimmedimages = imagesArray;
          }

          return setpost_loading(false);
        });

        // fetch the comments from teh subcollection comments
        // Fetch images from the "images" subcollection
        // const q = query(
        //   collection(db, "posts", postId, "comments"),
        //   orderBy("timeStamp"),
        // );
        // onSnapshot(commentsCollectionRef, (commentSnapshot) => {
        //   const commentArray: any[] = [];
        //   commentSnapshot.forEach((commentDoc: any) => {
        //     const commentData = commentDoc.data();

        //     const userId = commentData.userid;

        //     const comment_query = query(
        //       usersCollectionRef,
        //       where("userid", "==", userId),
        //     );
        //     getDocs(comment_query)
        //       .then((res) => {
        //         const userCommentInfo = res.docs[0].data();
        //         commentArray.push({
        //           avatar:
        //             userCommentInfo.avatar_url.length > 2
        //               ? userCommentInfo.avatar_url
        //               : "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*1fp3284*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODA5NzgyNC4zOC4xLjE2OTgxMDYzNjguMTcuMC4w",
        //           name:
        //             userCommentInfo.name.length > 1
        //               ? userCommentInfo.name
        //               : "User***** ",
        //           text: commentData.comment,
        //         });

        //         // Once you've collected all comments, sort them by timestamp (newest first)
        //         // commentArray.sort((a, b) => b.timestamp - a.timestamp);

        //         // Now, update the comments array with the sorted data
        //         // console.log(commentArray);
        //         return (postWithSubcollections.comments = commentArray);
        //       })
        //       .catch((err) => {
        //         console.error(err);
        //       });
        //   });
        // });

        // THIS IS FOR THE PINNED POST
        if (auth?.currentUser) {
          const userQuery = query(
            pinnedCollectionRef,
            where("user_id", "==", auth?.currentUser?.uid),
          );
          onSnapshot(userQuery, (subcollectionSnapshot) => {
            if (!subcollectionSnapshot.empty) {
              // setliked(true);
              console.log("it has been pined");

              postWithSubcollections.order = true;
            } else {
              console.log("it has been unnnnnnpined");
              postWithSubcollections.order = false;
              setpost_loading(false);
            }
          });
        }

        // this specifies the like option
        if (auth?.currentUser) {
          const userQuery = query(
            likesCollectionRef,
            where("user_id", "==", auth?.currentUser?.uid),
          );
          onSnapshot(userQuery, (subcollectionSnapshot) => {
            onSnapshot(likesCollectionRef, (likesSnapshot) => {
              postWithSubcollections.likesCount = likesSnapshot.size;
            });
            if (!subcollectionSnapshot.empty) {
              postWithSubcollections.liked = true;
            } else {
              postWithSubcollections.liked = false;
            }
          });
        }

        postArray.push(postWithSubcollections);
      });
      setPosts(postArray);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchParams = useSearchParams();

  const post_scroll = searchParams.get("post");

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setcomment_disabled(false);
      } else {
        setcomment_disabled(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!post_loading) {
      // Use the post ID to scroll to the corresponding element
      const element = document.getElementById(`${post_scroll}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        console.log(element);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_loading]);

  return (
    <>
      <h2 className="text-center neuem text-[3.2vw] sm:text-[9vw] text-white capitalize pt-[4vw] pb-[3vw]">
        Our Posts
      </h2>{" "}
      <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] sm:w-[90vw] sm:mx-auto sm:h-[0.5vw] "></div>
      <div className="w-full h-auto sm:h-[5vw]"></div>
      <div className="w-full sm:px-[4vw]  flex flex-col gap-[6vw] justify-center pt-[4vw] items-center">
        <Post_preloader />
        {!post_loading
          ? posts.map((e: any, index: any) => {
              return (
                <Post
                  key={index}
                  order={e.order ? 4 : 1}
                  id={e.postId}
                  postdata={e}
                  disable={comment_disabled}
                />
              );
            })
          : null}
        {post_loading ? (
          <>
            <Post_preloader /> <Post_preloader /> <Post_preloader />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Post_wrap;
