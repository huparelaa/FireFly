import React from 'react';

const UserLogros = ({ usuario }) => {
    return (
        <>
            <div className="py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            Logros y Trofeos:
                        </p>
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                            {usuario.logros_y_trofeos}
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserLogros;
