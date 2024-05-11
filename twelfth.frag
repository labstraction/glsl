
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float rect(vec2 p, vec2 c, vec2 size){
    float blx = step(c.x - size.x / 2., p.x);
    float bly = step(c.y - size.y / 2., p.y);
    float trx = 1.-step(c.x + size.x / 2., p.x);
    float try = 1.-step(c.y + size.y / 2., p.y);

    return blx * bly * trx * try;
}

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution;
    p.x *= u_resolution.x/u_resolution.y;

    p *= 100.;

    

    p.x += step(1. , mod(p.y, 2.)) * .25 + u_time * .1 * u_mouse.x * random(vec2(ceil(p.y), ceil(p.y))) * (mod(ceil(p.y), 2.) == 0. ? -1. : 1.);

    vec2 s = ceil(p);

    p=fract(p);
    
    vec3 color = vec3(0.+ rect(p, vec2(.5), vec2(step(u_mouse.y/u_resolution.y, noise(s)),.7)));

    gl_FragColor = vec4(color, 1.);
}