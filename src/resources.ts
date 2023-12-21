import { ImageFiltering, ImageSource, Loadable, Loader } from "excalibur";
import { TiledMapResource } from '@excaliburjs/plugin-tiled';


export const Resources = {
    HeroSpriteSheetPng: new ImageSource('./img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png', false, ImageFiltering.Pixel),
    TiledMap: new TiledMapResource('./res/beginner_town.tmx')
}

// Change the path to be relative to the root directory for the webpack prod build
const convertPath = Resources.TiledMap.convertPath;
Resources.TiledMap.convertPath = (originPath: string, relativePath: string) => {
    if (relativePath.indexOf('../') > -1) {
        return './' + relativePath.split('../')[1];
    }
    return convertPath(originPath, relativePath);
}

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}