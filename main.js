Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90
})
camera = document.getElementById("camera")
Webcam.attach("#camera")

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie"src="'+data_uri+'"/>'
    })
}

console.log("ml5 versao",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/KEdY7Oo2N/model.json",
modelLoaded)
function modelLoaded(){
    console.log("modelo carregado")
}

function speak(){
    var synth=window.speechSynthesis
    speakdata1 = tospeak
    var utterThis = new SpeechSynthesisUtterance(speakdata1)
    synth.speak(utterThis)

}

function check(){
    img = document.getElementById("selfie")
    classifier.classify(img,gotResult)
    
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }else{
        document.getElementById("resultemotionname").innerHTML = results[0].label
        gesture = results[0].label
        tospeak = ""
        if(gesture == "MIRANHA"){
            document.getElementById("updateemoji").innerHTML = "🤟"
            tospeak="isso é o miranha? 🤔"
        }
        if(gesture == "LIKE"){
            document.getElementById("updateemoji").innerHTML = "👍"
            tospeak="isso é o like? 🤔"
        }
        if(gesture == "DE BOA"){
            document.getElementById("updateemoji").innerHTML = "🤙"
            tospeak="isso é o de boa? 🤔"
        }
        speak()
    }
}