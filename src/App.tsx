// import { useRef, useState } from "react";

import { useEffect, useState } from "react"
import './App.css'

// import Phaser from "phaser";
// import { PhaserGame } from "./game/PhaserGame";

// function App ()
// {
//     // The sprite can only be moved in the MainMenu Scene
//     const [canMoveSprite, setCanMoveSprite] = useState(true);
    
//     //  References to the PhaserGame component (game and scene are exposed)
//     const phaserRef = useRef();
//     const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

//     const changeScene = () => {

//         const scene = phaserRef.current.scene;

//         if (scene)
//         {
//             scene.changeScene();
//         }
//     }

//     const moveSprite = () => {

//         const scene = phaserRef.current.scene;

//         if (scene && scene.scene.key === "MainMenu")
//         {
//             // Get the update logo position
//             scene.moveLogo(({ x, y }) => {

//                 setSpritePosition({ x, y });

//             });
//         }
//     }

//     const addSprite = () => {

//         const scene = phaserRef.current.scene;

//         if (scene)
//         {
//             // Add more stars
//             const x = Phaser.Math.Between(64, scene.scale.width - 64);
//             const y = Phaser.Math.Between(64, scene.scale.height - 64);

//             //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
//             const star = scene.add.sprite(x, y, "star");

//             //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
//             //  You could, of course, do this from within the Phaser Scene code, but this is just an example
//             //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
//             scene.add.tween({
//                 targets: star,
//                 duration: 500 + Math.random() * 1000,
//                 alpha: 0,
//                 yoyo: true,
//                 repeat: -1
//             });
//         }
//     }

//     // Event emitted from the PhaserGame component
//     const currentScene = (scene) => {

//         setCanMoveSprite(scene.scene.key !== "MainMenu");
        
//     }

//     return (
//         <div id="app">
//             <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
//             <div>
//                 <div>
//                     <button className="button" onClick={changeScene}>Change Scene</button>
//                 </div>
//                 <div>
//                     <button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</button>
//                 </div>
//                 <div className="spritePosition">Sprite Position:
//                     <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
//                 </div>
//                 <div>
//                     <button className="button" onClick={addSprite}>Add New Sprite</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default App


const Sprite = ({
    id
}: {
    id: string
}) => {
    // y start in the middle of screen
    const [yPosition, setYPosition] = useState(384);

    // on arrow key press, move sprite
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    setYPosition((prev) => prev - 150);
                    break;
                case "ArrowDown":
                    setYPosition((prev) => prev + 150);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // create annimation from public/assets/seal_sprites.png 313 × 432 pixels
    return (
        <div >
            <img src="src/assets/background.jpg" alt="background" className="w-16 h-16"/>
            <div id={id} class="seal" style={
                {
                    position: "absolute",
                    top: yPosition,
                    left: "100px",
                }
            }/>
        </div>
    )
}



export const App = () => {
    return (
        <div>
            <Sprite id="monster"/>
        </div>
    )
}