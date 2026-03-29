import { useState } from 'react'

const OWNER_PIN = '251025'

export function OwnerPinModal({ onSuccess, onClose }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const doShake = () => { setShake(true); setTimeout(() => setShake(false), 500) }

  const handleNum = (n) => {
    if (pin.length >= 6) return
    const next = pin + n
    setPin(next)
    setError('')
    if (next.length === 6) {
      setTimeout(() => {
        if (next === OWNER_PIN) { onSuccess() }
        else { setError('PIN salah. Coba lagi.'); setPin(''); doShake() }
      }, 150)
    }
  }

  const handleDel = () => { setPin(p => p.slice(0, -1)); setError('') }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      animation: 'fadeInFast .2s ease both'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 24, padding: '32px 28px', width: '100%', maxWidth: 340,
        textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,.35)',
        animation: shake ? 'none' : 'bounceIn .4s cubic-bezier(.22,1,.36,1) both',
        transform: shake ? 'translateX(0)' : undefined,
      }}>
        <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(119,85,55,.1)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:28 }}>🔐</div>
        <div style={{ fontFamily:'Space Grotesk', fontWeight:800, fontSize:20, color:'var(--sb)', marginBottom:6 }}>Owner Access</div>
        <p style={{ fontSize:13, color:'var(--mu)', marginBottom:24 }}>Masukkan PIN untuk masuk ke Owner Dashboard</p>

        {/* PIN Dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:24 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              width:14, height:14, borderRadius:'50%',
              background: i < pin.length ? 'var(--pr)' : 'var(--bd)',
              transition:'all .15s cubic-bezier(.22,1,.36,1)',
              transform: i < pin.length ? 'scale(1.2)' : 'scale(1)',
            }}/>
          ))}
        </div>

        {error && <div style={{ color:'var(--er)', fontSize:12, fontWeight:600, marginBottom:14, animation:'slideInLeft .2s ease both' }}>{error}</div>}

        {/* Numpad */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14 }}>
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((n,i) => (
            <button key={i}
              onClick={() => n==='⌫' ? handleDel() : n!=='' ? handleNum(String(n)) : null}
              style={{
                height:56, borderRadius:12, border:'none',
                background: n==='⌫' ? '#fdecea' : n==='' ? 'transparent' : 'var(--bg)',
                color: n==='⌫' ? 'var(--er)' : 'var(--tm)',
                fontSize: n==='⌫' ? 18 : 20,
                fontFamily:'Space Grotesk', fontWeight:700,
                cursor: n==='' ? 'default' : 'pointer',
                opacity: n==='' ? 0 : 1,
                transition:'transform .1s ease',
              }}
              onMouseDown={e => { if(n!=='') e.currentTarget.style.transform='scale(.92)' }}
              onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
              onTouchStart={e => { if(n!=='') e.currentTarget.style.transform='scale(.92)' }}
              onTouchEnd={e => e.currentTarget.style.transform='scale(1)'}
            >{n}</button>
          ))}
        </div>

        <button onClick={onClose} style={{
          width:'100%', padding:12, borderRadius:12, border:'1.5px solid var(--bd)',
          background:'transparent', color:'var(--mu)', fontSize:13, fontWeight:600, cursor:'pointer'
        }}>Batal</button>
      </div>
    </div>
  )
}
