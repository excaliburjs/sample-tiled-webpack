import * as ex from 'excalibur';
import { Resources, loader } from './resources';
import { Player } from './player';
import { DevTool } from '@excaliburjs/dev-tools';
import { TiledObjectComponent } from '@excaliburjs/plugin-tiled';

const game = new ex.Engine({
    width: 800,
    height: 600,
    canvasElementId: 'game',
    antialiasing: false
});

game.start(loader).then(() => {
    const objects = Resources.TiledMap.data.getObjectLayerByName("Objects");
    const script = Resources.TiledMap.data.getObjectLayerByName("script");

    for (let obj of script.objects) {
        // Cannot rely on [0] so need to loop for value = portal and name = name?
        if (obj.properties.some(p => p.value ==='portal')){ // < -- no longer depends on prop order
            // Actors have a built in circle collider if radius is set
            const actorWithCircleCollider = new ex.Actor({
                pos: ex.vec(obj.x + obj.width!/2, obj.y + obj.width!/2), // < -- tiled renders stuff oddly so this is a workaround
                radius: (obj.width || 20) / 2, // < - radius is 1/2 width
                collisionType: ex.CollisionType.Passive,
                color: ex.Color.Green, // <-- debug color
                z: 99,  // < -- debug z above all
                name:'portal',
                anchor: ex.vec(0.5, 0.5), // < -- switch back to center
            });

            actorWithCircleCollider.addComponent( new TiledObjectComponent(obj));

            actorWithCircleCollider.on('collisionstart', () => {
                console.log('Look at the portal on that!');
            });
            game.currentScene.add(actorWithCircleCollider);
        }
    }
    const player = objects.getObjectByName("Player");
    if (player) {
        const playerActor = new Player(ex.vec(player.x, player.y));
        playerActor.on('collisionstart', evt => {
            const data = evt.other.get(TiledObjectComponent)
            console.log(evt.other, data);
        });
        console.log(player.x, player.y);
        game.currentScene.add(playerActor);
        playerActor.z = 100;
        playerActor.scale = new ex.Vector(2, 2);
        game.currentScene.camera.strategy.elasticToActor(playerActor, .8, .9);
    }
    const devtool = new DevTool(game);

    Resources.TiledMap.addTiledMapToScene(game.currentScene);

    game.input.pointers.primary.on('down', evt => {
        const tile = Resources.TiledMap.getTileByPoint('ground', evt.worldPos);
        console.log('id', tile?.id, 'tile props:', tile?.properties);
    });
});