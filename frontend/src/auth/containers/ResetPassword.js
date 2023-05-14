import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import Swal from 'sweetalert2';

const ResetPassword = ({ reset_password }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    const onSubmit = (e) => {
      e.preventDefault();
      reset_password(email)
        .then(() => {
          Swal.fire({
            timer: 5000,
            timerProgressBar: true,
            icon: 'success',
            title: '¡Correo enviado con éxito!',
            text:
              'Se ha enviado un correo electrónico a tu cuenta con las instrucciones para restablecer la contraseña. Puede que el correo llegue a spam.',
          });
        })
        .then(() => navigate('/login'));
    };
    const onChange = e => setEmail(e.target.value);

    return (
        <div className="container mx-auto px-4 h-screen w-full flex items-center justify-center">
            <div className="clouds -z-20"></div>
            <div className="bg-form-color lg:w-1/3 md:w-3/4 h-2/5 rounded-lg flex flex-col items-center py-16 shadow-2xl">
                <div className="text-center mb-3 flex flex-col items-center">
                    <h2 className="text-blueGray-600 font-bold text-white mt-2 mb-2 font-roboto text-2xl">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <h3 className="text-white">Restaura tu contraseña aquí.</h3>
                </div>
                <form onSubmit={e => onSubmit(e)} className="w-5/6">
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            style={{ color: 'white' }}
                        >
                            Correo
                        </label>
                        <input
                            className="text-white form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="text-center mt-6">
                        <button
                            className="text-white bg-blueGray-800 active:bg-blueGray-600 bg-button-color-principal text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-button-color-pr-hov outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Restaurar contraseña
                        </button>
                    </div>
                </form>
                <div className="w-full flex justify-center"></div>
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
