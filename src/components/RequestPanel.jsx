import React from 'react'

export default function RequestPanel({ endpoints, onTry }){
  return (
    <div className="rp">
      <h4>Requests</h4>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {endpoints.map(ep => (
          <div key={ep.path} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
            <div>
              <strong style={{marginRight:8}}>{ep.method}</strong>
              <code style={{color:'#9aa8bd'}}>{ep.path}</code>
            </div>
            <div>
              <button onClick={() => onTry(ep)} style={{marginRight:6}}>Try</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
