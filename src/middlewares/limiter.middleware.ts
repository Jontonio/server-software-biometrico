import { rateLimit } from 'express-rate-limit'

export const limiter = (limit=100) => {
	
	return rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	skipFailedRequests: true,
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
	handler: (req, res, next, options) =>
		res.status(options.statusCode).send({ msg:'Realizó demasiadas solicitudes. Por favor inténtelo más tarde.' })
	})
}