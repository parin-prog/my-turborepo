import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import {
  Form, 
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import supabase from "~/services/supabase";
import { getFormProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { formSchema } from "~/schema/formSchema";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data: any = await request.formData();
  const submission = parseWithZod(data, { schema: formSchema });

  if(submission.status !== "success" && data.get("_action") === "save") {
    return submission.reply();
  }

  if (data.get("_action") === "status") {
    let completed = data.get("completed");
    if (completed === "true") {
      completed = true;
    } else {
      completed = false;
    }
    const d = await supabase
      .from("todo")
      .update({ completed: !completed, createdAt: new Date() })
      .eq("id", parseInt(data.get("id")))
      .select();
    console.log(d);
    return new Response("success !", { status: 200 });

  } else if (data.get("_action") === "delete") {

    const { error } = await supabase
      .from("todo")
      .delete()
      .eq("id", parseInt(data.get("id")));
    if (error) {
      return new Response(JSON.stringify({ ok: false, msg: error.message }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ ok: true, msg: "Success !" }), {
      status: 200,
    });

  } else {

    const { error } = await supabase
      .from("todo")
      .insert({ text: data.get("text") });

    if (error) {
      return new Response(JSON.stringify({ ok: false, msg: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ ok: true, msg: "Success !" }), {
      status: 200,
    });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data, error } = await supabase.from("todo").select("*");

  // if (error) {
  //   console.error("Error fetching todos:", error);
  // } else {
  //   console.log("Todos:", data);
  // }

  return new Response(JSON.stringify(data));
};

export default function Index() {
  const loader: any = useLoaderData();
  const actionData: any = useActionData();

  const tasks = JSON.parse(loader);

  
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: formSchema });
    },
  });
  
  useEffect(() => {
    if(actionData?.ok) {
      form.reset();
    }
  }, [actionData]);

  return (
    <div className="flex m-auto mt-20 items-center justify-center">
      <Form method="post" {...getFormProps(form)}>
        <div className="todo-actions flex justify-between">
          <TodoInput fields={fields} />
        </div>
        <TodoList tasks={tasks} />
      </Form>
    </div>
  );
}
