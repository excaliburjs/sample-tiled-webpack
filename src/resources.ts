import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledMapResource } from '@excaliburjs/plugin-tiled';


export const Resources = {
    HeroSpriteSheetPng: new ImageSource('../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png', false, ImageFiltering.Pixel),
    TiledMap: new TiledMapResource('../res/first-level.tmx')
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}