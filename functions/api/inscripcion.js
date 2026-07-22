const MAX_LEN = 200;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TRAMOS_VALIDOS = new Set(['general', 'taller']);

function redirect(url, base) {
	return Response.redirect(new URL(url, base), 303);
}

export async function onRequestGet({ request }) {
	return redirect('/#inscripcion', request.url);
}

export async function onRequestPost({ request, env }) {
	try {
		const formData = await request.formData();

		// Honeypot: si un bot llenó este campo, se descarta en silencio como si
		// la inscripción hubiera funcionado, para no revelarle que fue detectado.
		const honeypot = (formData.get('empresa_web') || '').toString().trim();
		if (honeypot !== '') {
			return redirect('/gracias', request.url);
		}

		const nombre = (formData.get('nombre') || '').toString().trim();
		const correo = (formData.get('correo') || '').toString().trim();
		const negocio = (formData.get('negocio') || '').toString().trim();
		const tramo = (formData.get('tramo') || '').toString().trim();

		const esValido =
			nombre.length > 0 &&
			nombre.length <= MAX_LEN &&
			correo.length > 0 &&
			correo.length <= MAX_LEN &&
			EMAIL_REGEX.test(correo) &&
			negocio.length > 0 &&
			negocio.length <= MAX_LEN &&
			TRAMOS_VALIDOS.has(tramo);

		if (!esValido) {
			return redirect('/?error=1#inscripcion', request.url);
		}

		const tramoLegible = tramo === 'general' ? 'Entrada general' : 'Taller intensivo';

		const cuerpoTexto = [
			'Nueva inscripción desde el sitio de demostración "Encuentro PyME Aconcagua".',
			'',
			`Nombre: ${nombre}`,
			`Correo: ${correo}`,
			`Negocio: ${negocio}`,
			`Tramo: ${tramoLegible}`,
			'',
			'Este mensaje viene del formulario de demostración; el evento no existe.',
		].join('\n');

		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: env.RESEND_FROM || 'onboarding@resend.dev',
				to: env.NOTIFY_EMAIL,
				reply_to: correo,
				subject: `Nueva inscripción (demo) — ${nombre}`,
				text: cuerpoTexto,
			}),
		});

		if (!resendResponse.ok) {
			console.error('Resend respondió con error', resendResponse.status, await resendResponse.text());
			return redirect('/?error=1#inscripcion', request.url);
		}

		return redirect('/gracias', request.url);
	} catch (error) {
		console.error('Error al procesar la inscripción', error);
		return redirect('/?error=1#inscripcion', request.url);
	}
}
