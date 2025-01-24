import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../../server";
import axios from "axios";
import { CgProfile } from "react-icons/cg";

const MessageList = ({data,index,setOpen,setCurrentChat,me,setUserData,online,setActiveStatus,isLoading}) => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/dashboard-messages?${id}`); 
      setOpen(true);
    };
    const [active, setActive] = useState(0);
  
    useEffect(() => {
      const userId = data.members.find((user) => user != me);
  
      const getUser = async () => {
        try {
          const res = await axios.get(`${server}/user/user-info/${userId}`);
          setUser(res.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }, [me, data]);
  
    return (
      <div className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"}  cursor-pointer`}
        onClick={(e) => setActive(index) || handleClick(data._id) || setCurrentChat(data) || setUserData(user) || setActiveStatus(online)}>
        <div className="relative">
            {user?.avatar?.url && <img src={`${user?.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full"/>}
            {!user?.avatar?.url && <CgProfile size={47} color="rgb(128 128 128)" />}
          {online ? (
            <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
          ) : (
            <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
          )}
        </div>
        <div className="pl-3">
          <h1 className="text-[18px]">{user?.name}</h1>
          <p className="text-[16px] text-[#000000cc]">
          {!isLoading && data?.lastMessageId && user?._id && (data?.lastMessageId !== user?._id)
              ? "You"
              : user?.name?.split(" ")[0] || "User"}{": "}{data?.lastMessage || ""}
          </p>
  
        </div>
      </div>
    );
  };

  export default MessageList;