import { Conditional } from './../../common/dtos/conditional.enum';
import { applyDecorators, SetMetadata } from '@nestjs/common';

/**
 *  Informa se a execução do controlador ou do método deve passar por validação de permissionamento
 *  @param permissions lista de permissões necessárias para executar controlador ou método
 *  @param requireAllPermissions indica se a lista de permissões 'permissions' são todas requeridas ou ao menos uma delas é requerida
 */
export const Authorize = (permissions: string[], requireAllPermissions = Conditional.OR) => {
  return applyDecorators(
    SetMetadata('HasAuthorize', true),
    SetMetadata('Authorize.permissions', permissions),
    SetMetadata('Authorize.requireAllPermissions', requireAllPermissions)
  );
};
