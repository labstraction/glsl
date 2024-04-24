
#ifdef GL_ES
precision mediump float;
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

float random (vec2 st, float seed) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898 * seed, 78.233 * seed)))*
        43758.5453123);
}


void main() {
    vec2 p = gl_FragCoord.xy/u_resolution.xy;

    p *= 10.;
    p.x += step(1., mod(p.y,2.0)) * 0.5 * u_time;
    p.x += step(1., mod(p.y + 1.,2.0)) * 0.5 * -u_time;
    p.y += step(1., mod(p.x,2.0)) * 0.5 * u_time;
    p.y += step(1., mod(p.x + 1.,2.0)) * 0.5 * -u_time;
    p = ceil(p);

    float rnd = random(vec2(p.x, p.y), 4.);

    vec3 color =vec3(0.9216, 0.0667, 0.851);

    vec3 paint = color * rnd;

    gl_FragColor = vec4(paint,1.0);
}
