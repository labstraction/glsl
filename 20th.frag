
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



vec3 rect(vec2 p, vec2 c, vec2 size, vec3 col){
    float blx = step(c.x - size.x / 2., p.x);
    float bly = step(c.y - size.y / 2., p.y);
    float trx = 1.-step(c.x + size.x / 2., p.x);
    float try = 1.-step(c.y + size.y / 2., p.y);

    return col * blx * bly * trx * try;
}

vec3 circle(vec2 p, vec2 c, float r, vec3 col){
    float dist = distance(p, c);
    return col * (1. - smoothstep(r-.01, r, dist));
}


vec3 light(vec2 p, vec2 o){
  return 1.- vec3(1.) * distance(o, p);
}


vec3 paint(vec3 pre, vec3 new, vec3 li){

    return pre + li * new;

}


vec3 paint2(vec3 pre, vec3 new, vec3 li){

    return (pre - min(pre, new));

}

void main() {

        
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 li = light(st, vec2(0.));
    vec3 circle1 = circle(st, vec2(.5), .3, vec3(0.2078, 0.9216, 0.0314));
    vec3 circle2 = circle(st, vec2(.3), .2, vec3(0.7451, 0.0314, 0.9216));
    vec3 color = paint(vec3(0.0, 0.0, 0.0), circle1, li);
    color = paint2(color, circle2, li);
    gl_FragColor = vec4(color, 1.);
}