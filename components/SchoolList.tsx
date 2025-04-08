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
import { Id } from "@/convex/_generated/dataModel";

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
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const [selectedSchool, setSelectedSchool] = React.useState<School | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  const addSchool = useMutation(api.schools.add);
  const updateSchool = useMutation(api.schools.update);
  const deleteSchool = useMutation(api.schools.remove);
  const schools = useQuery(api.schools.getAll) as School[] | undefined;

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      onAddOpenChange(); // Close the modal after successful addition
    } catch (err) {
      setError("Failed to add school. Please try again.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      if (selectedSchool) {
        await updateSchool({
          schoolId: selectedSchool._id as Id<"schools">,
          name: data.name as string,
          slug: data.slug as string,
          logoUrl: data.logoUrl as string,
          bannerUrl: data.bannerUrl as string,
          description: data.description as string,
          location: data.location as string,
        });

        onEditOpenChange(); // Close the modal after successful update
      }
    } catch (err) {
      setError("Failed to update school. Please try again.");
    }
  };

  const handleDelete = async () => {
    setError(null);

    try {
      if (selectedSchool) {
        await deleteSchool({ schoolId: selectedSchool._id as Id<"schools"> });
        onDeleteOpenChange(); // Close the modal after successful deletion
      }
    } catch (err) {
      setError("Failed to delete school. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schools</h1>
        <Button color="primary" onPress={onAddOpen}>
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
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No schools available">
          <>
            {schools?.map((school) => (
              <TableRow key={school._id}>
                <TableCell>{school.name}</TableCell>
                <TableCell>{school.slug}</TableCell>
                <TableCell>{school.location}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onPress={() => {
                      setSelectedSchool(school);
                      onEditOpen();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() => {
                      setSelectedSchool(school);
                      onDeleteOpen();
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </>
        </TableBody>
      </Table>

      {/* Add School Modal */}
      <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New School
              </ModalHeader>
              <ModalBody>
                <Form
                  className="flex flex-col gap-4"
                  onSubmit={handleAddSubmit}
                >
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

      {/* Edit School Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit School
              </ModalHeader>
              <ModalBody>
                <Form
                  className="flex flex-col gap-4"
                  onSubmit={handleEditSubmit}
                >
                  <Input
                    isRequired
                    label="Name"
                    name="name"
                    defaultValue={selectedSchool?.name}
                    placeholder="Enter school name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Slug"
                    name="slug"
                    defaultValue={selectedSchool?.slug}
                    placeholder="Enter school slug"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Logo URL"
                    name="logoUrl"
                    defaultValue={selectedSchool?.logoUrl}
                    placeholder="Enter logo URL"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Banner URL"
                    name="bannerUrl"
                    defaultValue={selectedSchool?.bannerUrl}
                    placeholder="Enter banner URL"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Description"
                    name="description"
                    defaultValue={selectedSchool?.description}
                    placeholder="Enter school description"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Location"
                    name="location"
                    defaultValue={selectedSchool?.location}
                    placeholder="Enter school location"
                    variant="bordered"
                  />
                  <div className="flex justify-end gap-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Update School
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete School Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete School</ModalHeader>
              <ModalBody>
                Are you sure you want to delete the school "
                {selectedSchool?.name}"?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
