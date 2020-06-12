export function errorsComponent(errors){
    return errors.map(error => `<li>${error}</li>`);
}