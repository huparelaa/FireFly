import React from 'react';

const UserInformation = ({ usuario }) => {
    return (
        <>
            <div className="mt-12">
                <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    <span className="inline-block w-32">Email:</span>
                    <span className="inline-block font-normal">{usuario.email}</span>
                </p>
            </div>

            <div className="mt-12">
                <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    <span className="inline-block w-32">Edad:</span>
                    <span className="inline-block font-normal">{usuario.age} años</span>
                </p>
            </div>

            <div className="mt-10 py-10 border-t border-blueGray-200">
                <div className="w-full lg:w-9/12 px-4">
                    <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Acerca de mí:
                    </p>
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {usuario.about_me}
                    </p>
                </div>
            </div>


        </>
    );
};

export default UserInformation;
