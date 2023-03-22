import React, {useEffect, useState,} from "react";
import axios from "axios";
import  {useParams} from 'react-router-dom'

function ProfileId(){
    const { id } = useParams();
    console.log(id);
    const [user, setUser] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const res = await axios(`${process.env.REACT_APP_API_URL}/profile/${id}/`);
            console.log(res);
            setUser(res.data.info);
        }
        fetchUser();
    }, [id]);
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleAddFriend = async () => {
        const config = {
            headers: { 
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/add_friends`, {
            'user_id': id // el ID del usuario al que se le quiere enviar la solicitud
        }, config);
        setRequestSent(true);
    }

    return (
        <main className="profile-page bg-white flex items-center justify-center">
        <section className="py-20 w-3/4">
            <div className="container mx-auto px-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <section className="hero container w-1/2  ">
                            <img style={{}} className="mx-auto rounded-full w-1/2" src="https://cdn.discordapp.com/avatars/280421723080228865/dd36c1b817d7c8cf91ca5944a0768c13.webp?size=2048" alt="screenshot" />
                        </section>
                    </div>
                    <div className="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            {user.name}
                        </h3>
                    </div> 
                    <div className="text-center mt-12">
                        <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            Email: {user.email}
                        </p>
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            Edad: {user.age}
                        </p>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    {user.about_me}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        onClick={handleAddFriend}
                        >
                        Añadir amigo
                    </button>
                </div>
                </div>
            </div>
        </section>
        </main>
    );
}

export default ProfileId