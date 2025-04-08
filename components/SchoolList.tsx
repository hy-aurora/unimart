import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface School {
  _id: string;
  name: string;
  slug: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  location: string;
  createdAt: number;
}

export default function SchoolList() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = React.useState<string | null>(null);

  const addSchool = useMutation(api.schools.add);
  const schools = useQuery(api.schools.getAll) as School[] | undefined;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      await addSchool({
        name: data.name as string,
        slug: data.slug as string,
        logoUrl: data.logoUrl as string,
        bannerUrl: data.bannerUrl as string,
        description: data.description as string,
        location: data.location as string,
        createdAt: Date.now(),
      });

      onOpenChange(false); // Close the modal after successful push
    } catch (err) {
      setError("Failed to add school. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schools</h1>
        <Button color="primary" onPress={onOpen}>
          Add School
        </Button>
      </div>

      {error && (
        <div className="text-danger mb-4 p-2 rounded bg-danger-50">{error}</div>
      )}

      <Table
        aria-label="Schools list"
        classNames={{
          wrapper: "shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>SLUG</TableColumn>
          <TableColumn>LOCATION</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No schools available">
          <>
            {schools?.map((school) => (
              <TableRow key={school._id}>
                <TableCell>{school.name}</TableCell>
                <TableCell>{school.slug}</TableCell>
                <TableCell>{school.location}</TableCell>
              </TableRow>
            ))}
          </>
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New School
              </ModalHeader>
              <ModalBody>
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                  <Input
                    isRequired
                    label="Name"
                    name="name"
                    placeholder="Enter school name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Slug"
                    name="slug"
                    placeholder="Enter school slug"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Logo URL"
                    name="logoUrl"
                    placeholder="Enter logo URL"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Banner URL"
                    name="bannerUrl"
                    placeholder="Enter banner URL"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Description"
                    name="description"
                    placeholder="Enter school description"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Location"
                    name="location"
                    placeholder="Enter school location"
                    variant="bordered"
                  />
                  <div className="flex justify-end gap-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Add School
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
