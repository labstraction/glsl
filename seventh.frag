
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time; 

float circle(vec2 st, float cx, float cy, float r){
    return 1. - step(r, sqrt(pow(st.x - cx, 2.) + pow(st.y - cy, 2.)));
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float c1v = 1.;
    float c2v = 1.;
    
    float c0 = circle(st, .5, .5, .3);
    float c1 = circle(st, sin(u_time * c1v) / 10. + .5, cos(u_time * c1v) / 10. + .5, .2);
    float c2 = circle(st, sin(u_time * c2v) / 10. + sin(u_time*c1v) / 10. + .5, -cos(u_time * c2v) / 10. + cos(u_time*c1v) / 10. + .5, .1);

    vec3 color = vec3(st, 1.);
    color = color * (1. - c0) + vec3(1., st) * c0;
    color = color * (1. - c1) + vec3(st, 1.) * c1;
    color = color * (1. - c2) + vec3(1., st) * c2;

    gl_FragColor = vec4(color,1.0);
}