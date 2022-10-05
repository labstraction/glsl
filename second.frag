precision highp float;

float PI = 3.14;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy;

  vec3 color = vec3(sin(sin(st.x / u_time)*u_time));
  color *= vec3(sin(sin(st.y / u_time)*u_time));
  
  gl_FragColor=vec4(color,1.);
}