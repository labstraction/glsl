
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

    st*=5.;

    vec2 tile = floor(st);

    vec2 point = fract(st);

    point.y = point.y + u_time/10. * (mod(tile.x, 2.) == 0. ? 1. : -1.);

    point*=4.;

    vec2 newpoint = fract(point);

    

    vec2 innertile = floor(point);

    newpoint.x = newpoint.x + u_time/10. * (mod(innertile.y, 2.) == 0. ? 1. : -1.);

    vec3 color = vec3(1) * rect(newpoint, vec2(.5), vec2(.5));

    gl_FragColor = vec4(color, 1.);
}