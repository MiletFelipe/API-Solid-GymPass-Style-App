import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-caste'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  Reflect.deleteProperty(user, 'password_hash')

  return reply.status(200).send({
    user,
  })
}
