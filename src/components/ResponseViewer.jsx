import React from 'react'

export default function ResponseViewer({ status, time, body }){
  return (
    <div className="rv">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div><strong>Status:</strong> <span style={{marginLeft:6}}>{status ?? '-'}</span></div>
        <div><strong>Time:</strong> <span style={{marginLeft:6}}>{time ? `${time} ms` : '-'}</span></div>
      </div>
      <pre style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.02)',padding:12,borderRadius:8}}>{body ?? ''}</pre>
    </div>
  )
}
