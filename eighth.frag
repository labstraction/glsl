
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


void main() {
    vec2 p = gl_FragCoord.xy/u_resolution.xy;


//    float rect1 = rect(p, vec2(.5), vec2(.2, .6));

    vec3 color0 = vec3(p.y);
//    vec3 color1 = vec3(.5, 0., 0.) * rect1;

    vec3 paint = color0;

    const float n = 15.;
    const float th = .7;
    const float h = th / 16.4;

    for(float i = 0.; i < n; i++) {
      float rect = rect(p, vec2(.5, (.5-(th / 2. - h / 2.) + (h * 1.1 * i)) + (.10 * cos(u_time * 2.))), vec2(.2, h));
      paint *= 1.-rect;
      paint += rect * vec3(.5);
    }

    gl_FragColor = vec4(paint,1.0);
}