const bcrypt = require('bcryptjs');

describe('Pruebas de Seguridad (Bcrypt)', () => {
  test('Debe encriptar la contraseña correctamente', async () => {
    const password = 'mi_password_secreto';
    // Generamos el hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // El hash no debe ser igual a la contraseña en texto plano
    expect(hash).not.toBe(password);
  });

  test('Debe validar una contraseña correcta', async () => {
    const password = 'mi_password_secreto';
    // Generamos el hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Verificamos que compare() devuelva true
    const esValida = await bcrypt.compare(password, hash);
    expect(esValida).toBe(true);
  });
});
