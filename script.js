const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// mouse function for following the mouse action on the window
var timeout;

// function for following the mouse
function mouseMoveFollower(xscale,yscale){
    window.addEventListener("mousemove",function (dets) {
        document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
//Mouse flatning function only when mouse moves
function mouseCircleFlat(){
    // define default scale value
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        var xdiff=dets.clientX-xprev;
        var ydiff=dets.clientY-yprev;

        xprev=dets.clientX;
        yprev=dets.clientY;

        xscale=gsap.utils.clamp(.8,1.2,xdiff);
        yscale=  gsap.utils.clamp(.8,1.2,ydiff);

        mouseMoveFollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(${0},${0})`;
        },100);
    });
}

//Animating firstPage
function firstPageAnime(){
    var t1 = gsap.timeline();

    t1.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.2,
        ease:Expo.easeInOut
    })
    .to(".boxEle",{
        y:0,
        duration: 0.8,
        ease:Expo.easeInOut,
        stagger: .2,
        delay:-1
    })
    .from("#footerHome",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1
    })
}
//Photo hover effects
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diffrot=0;

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:0.5,
        });
    });

    elem.addEventListener("mousemove",function(dets){
        var diff=dets.clientY-elem.getBoundingClientRect().top; 
        diffrot=dets.clientX-rotate;
        rotate=dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power1,
            top:diff,
            left:dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot*0.5)
        });
    });
});

mouseMoveFollower();
firstPageAnime();
mouseCircleFlat();