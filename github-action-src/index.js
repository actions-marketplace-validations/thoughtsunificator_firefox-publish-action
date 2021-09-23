import fs from 'fs';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import FormData from 'form-data';
import core from '@actions/core'

(async function() {

	try {

		const manifestData = fs.readFileSync(core.getInput("firefox-manifest"))
		const manifest = JSON.parse(manifestData)

		const readStream = fs.createReadStream(core.getInput("zip"));
		const stats = fs.statSync(core.getInput("zip"));
		const fileSizeInBytes = stats.size;

		const issuedAt = Math.floor(Date.now() / 1000);
		const payload = {
			iss: core.getInput("firefox-jwt-issuer"),
			jti: Math.random().toString(),
			iat: issuedAt,
			exp: issuedAt + 60,
		};

		const token = jwt.sign(payload, core.getInput("firefox-jwt-secret"), {
			algorithm: 'HS256',  // HMAC-SHA256 signing algorithm
		});

		const formData = new FormData();
		formData.append('upload', readStream);

		const response = await fetch(`https://addons.mozilla.org/api/v4/addons/${core.getInput("firefox-guid")}/versions/${manifest.version}/`, {
			method: "PUT",
			headers: {
				"Authorization": `JWT ${token}`
			},
			body: formData
		})

		const data = await response.json()

		if(response.status !== 200 && response.status !== 202) {
			throw new Error(data.error || data.detail)
		} else {
			core.info("Successfully published your browser extension.")
		}


	} catch (error) {
		core.setFailed(error.message)
	}


})()
