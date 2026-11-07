/* Manda un aviso a todos los que activaron la campana cuando se sube un video o fan art. */
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
admin.initializeApp();

const SITE_URL = 'https://lacritaproducciones.github.io/SkillBound/'; // <-- cambia esto

async function avisarATodos(title, body, hash){
  const snap = await admin.firestore().collection('tokens').get();
  const tokens = snap.docs.map(d => d.id);
  for(let i = 0; i < tokens.length; i += 500){
    const lote = tokens.slice(i, i + 500);
    const res = await admin.messaging().sendEachForMulticast({
      tokens: lote,
      notification: { title, body },
      data: { url: SITE_URL + hash },
      webpush: { fcmOptions: { link: SITE_URL + hash }, notification: { icon: SITE_URL + 'icon-192.png' } }
    });
    // borrar tokens que ya no sirven
    const borrar = [];
    res.responses.forEach((r, k) => {
      const c = r.error && r.error.code;
      if(c === 'messaging/registration-token-not-registered' || c === 'messaging/invalid-registration-token') borrar.push(lote[k]);
    });
    await Promise.all(borrar.map(t => admin.firestore().collection('tokens').doc(t).delete()));
  }
}

exports.nuevoVideo = onDocumentCreated('videos/{id}', (event) => {
  const v = event.data.data();
  return avisarATodos('Nuevo video en Skillbound ✦', v.title || 'Mira el nuevo video', '#videos');
});
exports.nuevoFanart = onDocumentCreated('fanposts/{id}', (event) => {
  const f = event.data.data();
  return avisarATodos('Nuevo fan art en Skillbound ✦', (f.caption || 'Nueva creación') + ' · por ' + (f.author || 'Anónimo'), '#fandom');
});
