import { ImageFiltering, ImageSource, Loader } from 'excalibur';
import { TiledResource } from '@excaliburjs/plugin-tiled';

import heroPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png?url';
import tmxPath from '../res/first-level.tmx?url';
import tsxPath from '../res/tileset.tsx?url';
import tilesetPath from '../img/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png?url';

import { Player } from './player';

export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroPath, false, ImageFiltering.Pixel),
    TiledMap: new TiledResource('./res/first-level.tmx', {
        entityClassNameFactories: {
            player: (props) => {
                const player = new Player(props.worldPos);
                player.z = 100;
                return player;
            }
        },
        pathMap: [
            { path: 'first-level.tmx', output: tmxPath },
            { path: 'Solaria Demo Update 01.png', output: tilesetPath },
            { path: 'tileset.tsx', output: tsxPath }
        ]
    })
};

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}
