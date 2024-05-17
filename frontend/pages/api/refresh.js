import nookies from 'nookies';
import { HttpClient } from '../../src/infra/httpClient/HttpClient';
import { tokenService } from '../../src/services/auth/tokenService';

const REFRESH_TOKEN = 'REFRESH_TOKEN';
const controllers = {
  async storeRefreshToken(request, response) {

    nookies.set(REFRESH_TOKEN, request.body.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
    })
    response.json({
      data: {
        message: 'Store with sucess',
      }
    })
  },
  async regenerateTokens(request, response) {
    const ctx = { request, response };
    const cookies = nookies.get(ctx);
    const refreshToken = cookies[REFRESH_TOKEN] || request.body.refresh_token;

    const refreshResponse = HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`, {
      method: 'POST',
      body: {
        refresh_token: refreshToken
      }
    })

    if (refreshResponse.ok) {
      nookies.set(ctx, REFRESH_TOKEN, refreshResponse.body.data.refresh_token , {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })

      tokenService.save(refreshResponse.body.data.access_token, ctx);

      response.status(200).json({
        data: refreshResponse.body.data
      })
    } else {
      response.status(401).json({
        status: 401,
        message: 'Não autorizado',
      })
    }
  },
  async deleteTokens(request, response) {
    const ctx = { request, response };
    nookies.destroy(ctx, REFRESH_TOKEN, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    response.status(200).json({
      data: {
        message: 'Token removido com sucesso!'
      }
    })
  }
}

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateTokens,
  PUT: controllers.regenerateTokens,
  DELETE: controllers.deleteTokens,
}

export default function handler(request, response) {
  if (controllerBy[request.method]) return controllerBy[request.method](request, response);

  response.status(404).json({
    status: 404,
    message: 'Not Found'
  })
}