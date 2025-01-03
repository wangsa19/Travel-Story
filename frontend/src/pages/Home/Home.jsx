import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { MdAdd } from "react-icons/md";
import Modal from 'react-modal';
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import AddEditTravelStory from './AddEditTravelStory';
import ViewTravelStory from './ViewTravelStory';

const Home = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [allStories, setAllStories] = useState([]);

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    });

    const [openViewModal, setOpenViewModal] = useState({
        isShown: false,
        data: null
    });

    // Get User Info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                // clear storage if unauthorized
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    // Get All Stories
    const getAllTravelStories = async () => {
        try {
            const response = await axiosInstance.get("/get-all-stories");
            if (response.data && response.data.stories) {
                setAllStories(response.data.stories);
            }
        } catch (error) {
            console.log("An uxpected error occurred. Please try again.");
        }
    };

    // handle edit story click
    const handleEdit = (data) => {
        setOpenAddEditModal({
            isShown: true,
            type: "edit",
            data: data,
        });

    };

    // handle travel story click
    const handleViewStory = (data) => {
        setOpenViewModal({
            isShown: true,
            data,
        });
    };

    // handle update favourite
    const updateIsFavourite = async (storyData) => {
        const storyId = storyData._id;
        console.log("storyId", storyId);

        try {
            const response = await axiosInstance.put("/update-is-favourite/" + storyId, {
                isFavourite: !storyData.isFavourite,
            });

            if (response.data && response.data.story) {
                toast.success("Story Updated successfully");
                getAllTravelStories();
            }
        } catch (error) {
            console.log("An uxpected error occurred. Please try again.", error);
        }
    };

    useEffect(() => {
        getAllTravelStories();
        getUserInfo();

        return () => { }
    }, []);


    return (
        <>
            <Navbar userInfo={userInfo} />

            <div className='container mx-auto py-10'>
                <div className="flex gap-7">
                    <div className="flex-1">
                        {allStories.length > 0 ? (
                            <div className='grid grid-cols-2 gap-4'>
                                {allStories.map((item) => {
                                    return (
                                        <TravelStoryCard
                                            key={item._id}
                                            imageUrl={item.imageUrl}
                                            title={item.title}
                                            story={item.story}
                                            date={item.visitedDate}
                                            visitedLocation={item.visitedLocation}
                                            isFavourite={item.isFavourite}
                                            onClick={() => handleViewStory(item)}
                                            onFavouriteClick={() => updateIsFavourite(item)}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <>Empty Card Here</>
                        )}
                    </div>
                    <div className="w-[320px]"></div>
                </div>
            </div>

            {/* Add & Edit Travel Story Modal */}
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 999,
                    },
                }}
                appElement={document.getElementById("root")}
                className="model-box"
            >
                <AddEditTravelStory
                    type={openAddEditModal.type}
                    storyInfo={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                    getAllTravelStories={getAllTravelStories}
                />
            </Modal>

            {/* View Travel Story Modal */}
            <Modal
                isOpen={openViewModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 999,
                    },
                }}
                appElement={document.getElementById("root")}
                className="model-box"
            >
                <ViewTravelStory 
                    storyInfo={openViewModal.data || null}
                    onClose={() => {
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                    }}
                    onEditClick={() => {
                        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                        handleEdit(openViewModal.data || null);
                    }}
                    onDeleteClick={() => {}}
                />
            </Modal>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10'
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: "add",
                        data: null
                    });
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <ToastContainer />
        </>
    )
}

export default Home
