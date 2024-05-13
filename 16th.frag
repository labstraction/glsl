
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 p, vec2 c, vec2 size){
    float blx = step(c.x - size.x / 2., p.x);
    float bly = step(c.y - size.y / 2., p.y);
    float trx = 1.-step(c.x + size.x / 2., p.x);
    float try = 1.-step(c.y + size.y / 2., p.y);

    return blx * bly * trx * try;
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float n = 20.;
    vec2 canvas = st*n;
    vec2 tile = floor(canvas);

    float time = 2.;
    float htime = time / 2.;
    float shift = .5 / htime;
    float yshift = (mod(u_time, time) < htime ? mod(u_time, 10.) * shift : 0.) * (mod(tile.x, 2.) == 0. ? 1. : -1.);
    float xshift = (mod(u_time, time) >= htime ? (mod(u_time, 10.) - htime) * shift : 0.) * (mod(tile.y, 2.) == 0. ? 1. : -1.);
    canvas.y = canvas.y + yshift;
    canvas.x = canvas.x + xshift;

    vec2 point = fract(canvas);

  
    point*=2.;

    vec2 innertile = floor(point);

    //point.x = point.x + u_time/1. * (mod(innertile.y, 2.) == 0. ? 1. : -1.);

    vec2 newpoint = fract(point);


    vec3 color = vec3(tile.x / n, 1. -tile.y / n, tile.x / tile.y)* rect(newpoint, vec2(.5), vec2(.5));

    gl_FragColor = vec4(color, 1.);
}