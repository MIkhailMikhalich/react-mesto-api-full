
export default class FormValidator
{
  constructor (form,config)
  {

    this._form=form;
    this._config=config;
    this.inputList = this._form.querySelectorAll(this._config.inputSelector);
    this.saveButton = this._form.querySelector(this._config.submitButtonSelector);

  }




_showErr(input)
{
  const errormes = this._form.querySelector(`#${input.id}-error`);
  errormes.textContent = input.validationMessage;
  input.classList.add(this._config.inputInvalidClass);
}

_hideErr(input)
{
  const errormes = this._form.querySelector(`#${input.id}-error`);
  errormes.textContent = "";
  input.classList.remove(this._config.inputInvalidClass);
}

_checkValidity(input)
{
  if(input.validity.valid){
    this._hideErr(input);
  }
  else
  {
    this._showErr(input);
  }
}

_setButtonState(button, isActive, config)
{

  if (isActive)
  {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  }
  else
  {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  }
}

_setEvents()
{

  this.inputList.forEach((input)=>{
    input.addEventListener('input', (evt)=>{
      this._checkValidity(input);
      this._setButtonState(this.saveButton,this._form.checkValidity(),this._config);
    })
  })
}
resetValidation()
{

  this.inputList.forEach((input)=>{this._form.querySelector(`#${input.id}-error`).textContent="";
  input.classList.remove(this._config.inputInvalidClass)});

      this._setButtonState(this.saveButton,this._form.checkValidity(),this._config);

}
enableValidate()
{
  this._setEvents();
  this._setButtonState(this.saveButton,this._form._checkValidity,this._config);
}
}

