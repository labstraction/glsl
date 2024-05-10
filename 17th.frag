
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

    st*=80.;

    vec2 tile = floor(st);

    vec2 point = fract(st);

    vec3 color = vec3(point.xyy) * fract(random(tile) + u_time);

    gl_FragColor = vec4(color, 1.);
}