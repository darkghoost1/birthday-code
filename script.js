const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

class Particle{
    constructor(x,y,color,speedX,speedY){
        this.x=x;
        this.y=y;
        this.color=color;
        this.speedX=speedX;
        this.speedY=speedY;
        this.radius=Math.random()*3+2;
        this.alpha=1;
        this.decay=Math.random()*0.015+0.005;
    }

    draw(){
        ctx.save();
        ctx.globalAlpha=this.alpha;

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fillStyle=this.color;
        ctx.shadowBlur=20;
        ctx.shadowColor=this.color;

        ctx.fill();
        ctx.restore();
    }

    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.speedY+=0.03;
        this.alpha-=this.decay;
    }
}

let particles=[];

function createFirework(x,y){

    const colors=[
        '#ff2d55',
        '#00e5ff',
        '#ffd700',
        '#7cff00',
        '#ff66ff',
        '#ffffff'
    ];

    const color=
    colors[Math.floor(Math.random()*colors.length)];

    for(let i=0;i<70;i++){

        const angle=Math.random()*Math.PI*2;
        const speed=Math.random()*6+1;

        particles.push(
            new Particle(
                x,
                y,
                color,
                Math.cos(angle)*speed,
                Math.sin(angle)*speed
            )
        );
    }
}

function animate(){

    ctx.fillStyle='rgba(0,0,0,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((particle,index)=>{

        if(particle.alpha<=0){
            particles.splice(index,1);
        }else{
            particle.update();
            particle.draw();
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('click',(e)=>{
    createFirework(e.clientX,e.clientY);
});

setInterval(()=>{

    createFirework(
        Math.random()*canvas.width,
        Math.random()*canvas.height*0.5
    );

},800);