window.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var engine = new BABYLON.Engine(canvas,true);

  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var assetsManager = new BABYLON.AssetsManager(scene);
    var meshTask = assetsManager.addMeshTask("shark task", "", "./", "shark.glb");
    var shark = meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    }
    meshTask.onError = function (task, message, exception) {
        console.log("message", exception);
    }
    // scene.clearColor = new BABYLON.Color3.White();
    var camera = new BABYLON.ArcRotateCamera("arcCamera",
    BABYLON.Tools.ToRadians(45),
    BABYLON.Tools.ToRadians(45),
    10.0, shark.position,scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas,true);

    shark = BABYLON.SceneLoader.ImportMesh("", "./", "shark.glb", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        camera.target = newMeshes[0];
    });
    var box = BABYLON.Mesh.CreateBox("Box",4.0,scene);
    // var box2 = BABYLON.Mesh.CreateBox("Box2",4.0,scene);
    // var material = new BABYLON.StandardMaterial("material1",scene);
    // material.wireframe = true;
    // box2.material = material;
    // box2.position = new BABYLON.Vector3(0,3,0);


    // var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);

    // var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0,10,0), new BABYLON.Vector3(0,-1,0),
    // BABYLON.Tools.ToRadians(45), 0.1, scene);
     var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0,10,0),scene)
    light.parent = camera;
    light.diffuse = new BABYLON.Color3(1,1,1);

    // var material = new BABYLON.StandardMaterial("material",scene);

    // material.diffuseColor = BABYLON.Color3.Blue();
    // material.emissiveColor = BABYLON.Color3.Red();
    // material.specularColor = BABYLON.Color3.Red();
    // material.alpha = 0.7;
    // box.material = material;

    return scene;
  }
  var scene = createScene();
  engine.runRenderLoop(function(){

    scene.render();
  });
});
