import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';
import { Player } from "./player";


export const Resources = {
    HeroSpriteSheetPng: new ImageSource('./img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png', false, ImageFiltering.Pixel),
    TiledMap: new TiledResource('./res/first-level.tmx', {
        entityClassNameFactories: {
            player: (props) => {
                const player = new Player(props.worldPos);
                player.z = 100;
                return player;
            }
        },
    })
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}