
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

void main() {

        
    vec2 st = gl_FragCoord.xy / u_resolution;
    float dist = distance(st, vec2(.5));
    float circle = 1. - smoothstep(0.3, 0.31, dist);
    gl_FragColor = vec4(1.) * (circle + rect(st, vec2(.2), vec2(.3))) * distance(st, vec2(.1));
}