"use client";

import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  updateDoc,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import firebaseConfig from "../../utils/fire_base_config";

// import Comments_modal from "./comment";
import { headers } from "next/headers";
import Admin_Image_display from "./admin_edit_image_display";
import DeletPost_modal from "./delete_post_modal";
import { deleteObject, getStorage, listAll, ref } from "firebase/storage";
import Pinned_modal from "./admin_pinned";
import Display_media from "./display_media";

const Admin_Post = (props: any) => {
  const [liked, setliked] = useState(false);

  const [showmore, setshowmore] = useState(false);
  const [showcomment, setshowcomment] = useState(false);

  const [commentvalue, setcommentvalue] = useState("");

  // the component coming from the parent
  const {
    postdata,
    id,
    order,
    disable,
    setreload_pinned,
    setpinnnedid,
    setpost_loading,
    sethide_pinned_modal,
    goback,
    setedit_postid,
  } = props;

  const [err, seterr] = useState(false);

  const [likes, setlikes] = useState(0);
  const [comment_info_data, setcomment_info_data] = useState<any>([]);

  // this handles the copy function
  const [copied, setcopied] = useState("");
  const [hostlink, sethostlink] = useState("");

  // this is for the image display
  const [img_display_arr, setimg_display_arr] = useState([]);

  const [img_display, setimg_display] = useState("");

  const [img_display_show, setimg_display_show] = useState(false);

  const [pinned, setpinned] = useState(false);
  const [local_comments, setlocal_comments] = useState([{}]);

  //   for deleting data
  const [showdeletemodal, setshowdeletemodal] = useState(false);
  const [delete_info, setdelete_info] = useState("Delete");

  const [video, setvideo] = useState(false);
  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "3gp",
    "mpeg",
    "ogv",
    "ogg",
  ];

  useEffect(() => {
    // After fetching the posts, sort them by createdAt timestamp
    sethostlink(window.location.host);
    const likesCollectionRef = collection(
      db,
      "posts",
      postdata.postId,
      "likes",
    );
    const usersCollectionRef = collection(db, "users");
    const commentsCollectionRef = collection(
      db,
      "posts",
      postdata.postId,
      "comments",
    );
    const pinnedCollectionRef = doc(db, "posts", postdata.postId);
    onSnapshot(likesCollectionRef, (likesSnapshot) => {
      // postWithSubcollections.likesCount = likesSnapshot.size;
      setlikes(likesSnapshot.size);
    });

    if (auth?.currentUser) {
      const userQuery = query(
        likesCollectionRef,
        where("user_id", "==", auth?.currentUser?.uid),
      );
      onSnapshot(userQuery, (subcollectionSnapshot) => {
        if (!subcollectionSnapshot.empty) {
          setliked(true);
        } else {
          setliked(false);
        }
      });
    }

    // this is for the pinning section

    // onSnapshot(pinnedCollectionRef, (docSnapshot) => {
    //   if (docSnapshot.exists()) {
    //     const data = docSnapshot.data();
    //     const currentPinnedValue: any = data.pinned;

    //     setpinned(currentPinnedValue);
    //     console.log(currentPinnedValue);
    //   } else {
    //     console.log("Document does not exist.");
    //   }
    // });
    onSnapshot(commentsCollectionRef, (commentSnapshot) => {
      const commentArray: any[] = [];
      setcomment_info_data([]);
      commentSnapshot.forEach((commentDoc: any) => {
        const commentData = commentDoc.data();

        const userId = commentData.userid;

        const comment_query = query(
          usersCollectionRef,
          where("userid", "==", userId),
        );
        getDocs(comment_query)
          .then((res) => {
            const userCommentInfo = res?.docs[0]?.data();
            // commentArray = [];
            commentArray.push({
              avatar: userCommentInfo.avatar_url,
              name:
                userCommentInfo.name.length > 1
                  ? userCommentInfo.name
                  : "User***** ",
              text: commentData.comment,
            });
            // Once you've collected all comments, sort them by timestamp (newest first)
            // commentArray.sort((a, b) => b.timestamp - a.timestamp);
            // Now, update the comments array with the sorted data
            // return (postWithSubcollections.comments = commentArray);

            setcomment_info_data(commentArray);
          })
          .catch((err) => {
            // console.error("thodoo" + err);
          });
      });
    });

    if (auth?.currentUser) {
      const userQuery = query(
        likesCollectionRef,
        where("user_id", "==", auth?.currentUser?.uid),
      );
      onSnapshot(userQuery, (subcollectionSnapshot) => {
        if (!subcollectionSnapshot.empty) {
          setliked(true);
        } else {
          setliked(false);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setlikes(postdata.likesCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  // const [img_items, setimg_items] = useState<any>([]);

  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Define the main collection reference
  const colRef = collection(db, "posts");

  // Get the current user (if needed)
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        seterr(false);
      } else {
        seterr(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlepinned = async (postid: any) => {
    const pinnedCollectionRef = doc(db, "posts", postdata.postId);
    setpost_loading(true);
    // Update the document with the new "pinned" value
    updateDoc(pinnedCollectionRef, { pinned: !postdata.postData.pinned })
      .then((res) => {
        setpinnnedid(postdata.postId);
        if (postdata.postData.pinned == false) {
          sethide_pinned_modal(true);
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handlecomment = (e: any) => {
    if (commentvalue != "") {
      const comment_CollectionRef = collection(db, "posts", e, "comments");
      const authid = auth.currentUser?.uid;
      const commentinfo = { comment: commentvalue, userid: authid };

      addDoc(comment_CollectionRef, commentinfo)
        .then((res) => {
          setcommentvalue("");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const deletepost = () => {
    setdelete_info("Deleting..");
    const delete_doc_reference = doc(db, "posts", postdata.postId);

    // Call this function to delete a post and its subcollections and associated storage files
    deletePostAndSubcollections(postdata.postId);
  };

  const deletePostAndSubcollections = (postId: any) => {
    setdelete_info("Deleting...");
    const db = getFirestore();
    const storage = getStorage(); // Initialize Firebase Storage

    const deleteSubcollection = (parentRef: any, subcollectionName: any) => {
      return getDocs(collection(parentRef, subcollectionName)).then(
        (snapshot) => {
          if (!snapshot.empty) {
            const deletePromises = snapshot.docs.map((doc) => {
              return deleteDoc(doc.ref);
            });
            return Promise.all(deletePromises).then(() => {}); // Convert Promise<any[]> to Promise<void>
          }
          return Promise.resolve(); // Resolve immediately if the subcollection is empty
        },
      );
    };

    const deleteStorageFiles = (postId: any) => {
      const storageRef = ref(storage, `posts/${postId}`);
      return listAll(storageRef).then((listResults) => {
        if (listResults.items.length > 0) {
          const deletePromises = listResults.items.map((itemRef) => {
            return deleteObject(itemRef); // Delete each file
          });
          return Promise.all(deletePromises).then(() => {});
        }
        // If no files are present, resolve the promise with void
        return Promise.resolve();
      });
    };

    const postRef = doc(db, "posts", postId);
    setdelete_info("Deleting images ");
    // Delete all image documents
    deleteSubcollection(postRef, "images")
      .then(() => {
        // Delete all image files from storage
        return deleteStorageFiles(postId);
      })
      .then(() => {
        // After images are deleted, delete all comments
        setdelete_info("Deleting comments ");
        return deleteSubcollection(postRef, "comments");
      })
      .then(() => {
        // After comments are deleted, delete the post document
        setdelete_info("Deleting post ");
        return deleteDoc(postRef);
      })
      .then(() => {
        setdelete_info("Deleted.");
        setshowdeletemodal(false);
      })
      .catch((error) => {
        console.error("Error removing post and related data: ", error);
        setdelete_info("An error occurred while deleting the post.");
      });
  };

  // //   for deleting the files in the folder and all of that
  // const deleteFilesInFolder = async (folderPath: any) => {
  //   const storage = getStorage();
  //   const folderRef = ref(storage, folderPath);

  //   try {
  //     // Optionally, delete the folder itself
  //     // Note: The folder must be empty for this to work
  //     // await deleteObject(folderRef);

  //     if (postdata.images.length > 0) {
  //       setdelete_info("Deleting Media");
  //       // List all files in the folder
  //       const listResult = await listAll(folderRef);

  //       // Iterate through files and delete each one
  //       const deletePromises = listResult.items.map((item) =>
  //         deleteObject(item),
  //       );

  //       // Wait for all delete operations to complete
  //       await Promise.all(deletePromises);
  //       setdelete_info("Deleted");
  //       setpost_loading(true);
  //       setTimeout(() => {
  //         setpost_loading(false);
  //       }, 500);
  //       setshowdeletemodal(false);
  //     } else {
  //       setpost_loading(true);
  //       setTimeout(() => {
  //         setpost_loading(false);
  //       }, 500);
  //       setdelete_info("Deleted");
  //       setshowdeletemodal(false);
  //     }
  //   } catch (error) {
  //     console.error(`Error deleting files in folder '${folderPath}':`, error);
  //   }
  // };

  useEffect(() => {
    // Set a timer to reset the text after 1000 milliseconds (1 second)
    const timer = setTimeout(() => {
      setcopied("");
    }, 2000);

    // Clean up the timer when the component unmounts or when the effect re-runs
    return () => {
      clearTimeout(timer);
    };
  }, [copied]); // Empty dependency array ensures the effect runs only once
  return (
    <>
      <section
        className={` w-[58vw] h-auto flex flex-col py-[4vw] gap-[3vw]  bg-[white] rounded-[1.5vw]`}
        id={id}
        style={{ order: order }}
      >
        {/*the heading */}

        <div className="w-full px-[4vw] flex flex-col gap-[0.7vw]  items-start">
          <div className="w-full flex items-center text-[1vw] gap-[0.5vw] text-opacity-[70%] text-[#010101] neuer">
            <p className="">{postdata.timeAgo}</p>
            <div className="rounded-[100%] bg-[#010101] bg-opacity-[30%] h-[0.3vw] w-[0.3vw]"></div>{" "}
            <p>{postdata.exactTime}</p>
          </div>
          <div className="flex w-full justify-between items-center ">
            <h2 className="text-[#010101] text-[2.2vw] neuem capitalize">
              {postdata.postData.title}
            </h2>
            {postdata.latest && (
              <span className="py-[1vw] px-[2vw] rounded-[1.5vw] bg-[#CCFF00] neuer text-[1.2vw]">
                Latest Post
              </span>
            )}
          </div>
        </div>
        {/* the images */}
        {postdata.images.length > 0 && (
          <div className="w-full flex flex-wrap gap-[1vw] relative  justify-center items-center px-[0vw]">
            {postdata.trimmedimages.map((e: any, index: any) => {
              const isVideoLink = videoExtensions.some((ext) =>
                e.link.includes(`.${ext}`),
              );

              if (isVideoLink) {
                return (
                  <div
                    key={index}
                    className="w-[28vw]   relative h-[24vw] cursor-pointer hover:scale-[1.01] transition duration-[0.6s] avater_bg rounded-[1.5vw] overflow-hidden "
                    // style={{
                    //   backgroundImage: `url(/subscription/video_loader.webp)`,
                    // }}
                    onClick={() => {
                      setvideo(true);
                      setimg_display_arr(postdata.images);
                      setimg_display(e.link);
                      setimg_display_show(true);
                    }}
                  >
                    <video
                      src={e.link}
                      muted
                      playsInline
                      loop={true}
                      autoPlay
                      className="aspect-[1/0.9] scale-y-[1.8] scale-x-[1.4] w-full"
                    ></video>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="w-[28vw]   relative h-[24vw] cursor-pointer hover:scale-[1.01] transition duration-[0.6s] avater_bg rounded-[1.5vw] overflow-hidden "
                    style={{ backgroundImage: `url(${e.link})` }}
                    onClick={() => {
                      setvideo(false);
                      setimg_display_arr(postdata.images);
                      setimg_display(e.link);
                      setimg_display_show(true);
                    }}
                  >
                    {" "}
                    <img
                      src={e.link}
                      alt={index + "bg images"}
                      className="h-fit w-full"
                    />
                  </div>
                );
              }
            })}
            {postdata.images.length > 4 && (
              <div
                className="absolute right-[0.45vw] bottom-0 h-[24vw] bg-[#000000] cursor-pointer  transition duration-[0.6s] bg-opacity-[78%] rounded-[1.5vw] flex justify-center items-center w-[28.1vw] "
                onClick={() => {
                  setimg_display_arr(postdata.images);
                  setimg_display(postdata.images[3].link);
                  setimg_display_show(true);
                }}
              >
                <p className="neuem text-[4.2vw] text-[white] text-center ">
                  +{postdata.images.length - 4}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="w-full px-[4vw] text-[#010101] text-opacity-[50%] text-[1.2vw] flex flex-col gap-[0.7vw] items-start ">
          {showmore ? (
            <p
              className="w-[100%] neuer"
              dangerouslySetInnerHTML={{
                __html: postdata.postData.description,
              }}
            ></p>
          ) : (
            <p
              className="w-[100%] neuer"
              dangerouslySetInnerHTML={{ __html: postdata.trimmedDescription }}
            ></p>
          )}

          {postdata.postData.description.length >= 249 && (
            <span
              className="text-[#CCFF00] cursor-pointer hover:underline hover:underline-offset-4 transition duration-[0.6s] neuem"
              onClick={() => {
                setshowmore(!showmore);
              }}
            >
              {showmore ? "See less" : "Read more"}
            </span>
          )}

          {/* the icons */}
          <div className="w-full  py-[1vw]  h-auto  flex justify-between items-center">
            <div className="w-auto flex justify-start gap-[1.7vw] ">
              {" "}
              <i
                className="bi relative bi-upload text-[#010101] text-[1.3vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                style={{
                  color: copied == "copied url" ? "#CCFF00" : "#010101",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    hostlink + "/subscriptions?post=" + postdata.postId,
                  );
                  setcopied("copied url");
                }}
              >
                <p
                  className="text-[0.8vw] w-[4.5vw]  text-opacity-[70%] absolute bottom-[-0.8vw] right-[-1.8vw]"
                  style={{ color: "#010101" }}
                >
                  {copied}
                </p>
              </i>
              {/* this is the trash icon */}
              <i
                className="bi hover:text-[#95B611] bi-trash text-[#010101] text-[1.3vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                onClick={() => {
                  setdelete_info("Delete ");
                  setshowdeletemodal(true);
                }}
              ></i>
              {/* this is the pencil icon */}
              <i
                className="bi hover:text-[#95B611] bi-pencil text-[#010101] text-[1.3vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                onClick={() => {
                  setedit_postid(postdata.postId);
                  goback();
                }}
              ></i>
              {/* this is the pinning  icon */}
              <i
                className="bi hover:text-[#95B611] bi-pin-angle-fill text-[#010101] text-[1.3vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                onClick={handlepinned}
                style={{
                  color: postdata.postData.pinned ? "#95B611" : "#010101",
                }}
              ></i>
            </div>

            <div className="w-auto flex gap-[1vw] justify-end items-center ">
              <p className="text-[1vw] text-[#CCFF00] neuer">
                {postdata.likesCount}{" "}
                {postdata.likesCount < 2 ? "Like" : "Likes"}
              </p>
              <i className="bi hover:text-[#95B611] bi-bar-chart-fill text-[#010101] text-[1.3vw] hover:opacity-[100%] duration-[0.6s] transition opacity-[70%] cursor-pointer"></i>
            </div>
          </div>

          <button
            className="text-[#010101] bg-transparent neuer text-opacity-[50%]"
            onClick={() => {
              // setcomment_info_data(postdata.comments);
              setshowcomment(true);
            }}
          >
            {showcomment ? "" : " See comments"}
          </button>

          {/* the form to handle comments  */}
          <div className="w-full h-auto  mt-[0vw] relative text-[1vw]">
            <input
              type="text"
              placeholder={err ? "Login to comment" : "Write a  comment"}
              className="w-full h-[3.4vw] rounded-[2.5vw] text-[#010101] text-opacity-[80%] px-[2vw] neuer outline-none border-[black] border-opacity-[26%] focus:border-opacity-[80%] border-[0.12vw] transition duration-[0.6s] bg-[white]"
              onChange={(e: any) => {
                setcommentvalue(e.target.value);
              }}
              disabled={disable}
              value={commentvalue || ""}
            />
            <button
              type="submit"
              disabled={disable}
              className="text-[#CCFF00]  neuer text-[1.2vw]  absolute right-[1.3vw] hover:hover:text-[#7e9426] transition duration-[0.5s] top-[-50%] translate-y-[50%] h-full"
              onClick={() => {
                handlecomment(postdata.postId);
              }}
            >
              Post{" "}
            </button>
          </div>
        </div>
      </section>

      {/* {showcomment && (
        <Comments_modal commentwrap={comment_info_data} hide={setshowcomment} />
      )} */}

      {showdeletemodal && (
        <DeletPost_modal
          setshowdeletemodal={setshowdeletemodal}
          deletepost={deletepost}
          delete_info={delete_info}
        />
      )}
      {img_display_show && (
        <Display_media
          img_display_arr={img_display_arr}
          setimg_display_arr={setimg_display_arr}
          img_display={img_display}
          setimg_display={setimg_display}
          setimg_display_show={setimg_display_show}
          video={video}
          setvideo={setvideo}
        />
      )}
    </>
  );
};
export default Admin_Post;