import React from 'react'

export default function LogConsole({ logs }){
  return (
    <div className="lc" style={{marginTop:12}}>
      <h4>Log Console</h4>
      <div style={{background:'rgba(255,255,255,0.02)',padding:10,borderRadius:8,maxHeight:180,overflow:'auto'}}>
        {logs.map((l,i) => (
          <div key={i} style={{fontFamily:'monospace',fontSize:13,opacity:0.95,marginBottom:6}}>[{l.level}] {l.msg}</div>
        ))}
      </div>
    </div>
  )
}
