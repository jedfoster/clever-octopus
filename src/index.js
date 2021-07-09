import React from "react";
import ReactDOM from "react-dom";
import {
  useForm,
  useFormContext,
  useFormState,
  FormProvider
} from "react-hook-form";

import "./styles.css";

function Form(props) {
  const { children, className, methods, onSubmit } = props;

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

function Input({ name, label, placeholder, rules, ...props }) {
  const { control, register } = useFormContext();
  const { errors } = useFormState({ control });

  if (errors[name]) console.warn(errors[name].message);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input placeholder={placeholder} {...register(name, rules)} {...props} />
      {errors[name] && <p>{errors[name].message}</p>}
    </div>
  );
}

function App() {
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit
  // } = useForm({
  //   mode: "onBlur" // "onChange"
  // });

  const methods = useForm({ mode: "onChange" });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = methods;
  const onSubmit = (data) => {
    console.warn(getValues());
    // alert(`FUCKIN A ${JSON.stringify(data)}`);
  };

  return (
    <div className="App">
      <Form methods={methods} onSubmit={onSubmit}>
        <Input
          name="firstName"
          label="First Name"
          placeholder="bill"
          defaultValue="bi"
          rules={{
            required: "this is fuckin required",
            maxLength: { value: 2, message: "only 2 fuckin chars" }
          }}
        />

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder="luo"
            {...register("lastName", { required: "this is fuckin required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email
          </label>
          <input {...register("email", { required: true })} />
          {errors.email && <p>This is required</p>}
        </div>
        <input type="submit" />
      </Form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
