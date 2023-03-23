import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesConfig from "./particles2.json";

const App = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div>
            <Particles
                style={{ position: "relative" }}
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesConfig}
            />

            <main style={{ position: "absolute" }} className="box">
                <h2>Register</h2>
                <form>
                    <div className="inputBox">
                        <label htmlFor="userName">Username</label>
                        <input type="text" name="userName" id="userName" placeholder="type your username" required />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password" name="userPassword" id="userPassword" placeholder="type your password"
                            required />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="userConfirmPassword">Confirm Password</label>
                        <input type="password" name="userPassword" id="userConfirmPassword"
                            placeholder="confirm your password"
                            required />
                    </div>
                    <button type="submit" name="" style={{ float: "left" }}>Submit</button>
                </form>
            </main>

        </div>
    );
};

export default App;