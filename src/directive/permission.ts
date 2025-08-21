
export const permission = {
  mounted(el: HTMLElement, binding: any) {
    const { value: requiredPermission } = binding;

    const userPermission = JSON.parse(localStorage.getItem('permission')) ;
    if(!userPermission) return;
    const permissionConfig = {
      'user': { level: 1 },
      'admin': { level: 2, inherits: ['user'] },
      'boss': { level: 3 , inherits: ['admin'] },
      'root': { level: 4 , inherits: ['boss'] },
    };

    const hasPermission = (userPermission: string, permission: string) => {
      if(userPermission === permission) return true;
      const userConfig = permissionConfig[userPermission];
      const requiredConfig = permissionConfig[permission];
      if(!userConfig ||!requiredConfig) return false;
      if(userConfig.level > requiredConfig.level) return true;
      return userConfig.inherits?.includes(permission) || false;
    }
    if(!hasPermission(userPermission,requiredPermission)) {
      el.parentNode?.removeChild(el);
    }
  },
}