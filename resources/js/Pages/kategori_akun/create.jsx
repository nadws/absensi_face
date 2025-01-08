import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select2Box from "@/Components/Select2box";
import roles from "@/data/role.json";
import SecondaryButton from "@/Components/SecondaryButton";

export default function PemilikCreate({ auth }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            kategori: "",
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("kategoriakun.store"), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Kategori Created");
            },
            onError: (errors) => {
                alert("Kategori not created");
            },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="kategori Akun" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm">
                        <div className="p-6 text-gray-900">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create Kategori Akun
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create a new Kategori Akun.
                                    </p>
                                </header>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="kategori"
                                            value="Kategori"
                                        />

                                        <TextInput
                                            id="kategori"
                                            className="mt-1 block w-full"
                                            value={data.kategori}
                                            onChange={(e) =>
                                                setData(
                                                    "kategori",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="kategori"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.kategori}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                        <Link
                                            rel="stylesheet"
                                            href={route("kategoriakun")}
                                        >
                                            <SecondaryButton>
                                                Cancel
                                            </SecondaryButton>
                                        </Link>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
