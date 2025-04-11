"use client";

import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input,
  Spinner,
  Card
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

interface SchoolFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchoolFinderModal({ isOpen, onClose }: SchoolFinderModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  // Fetch all schools or filtered by search term
  const schools = useQuery(api.schools.searchSchools, { 
    query: searchTerm.length > 2 ? searchTerm : '' 
  });
  
  const handleSchoolSelect = (schoolSlug: string) => {
    router.push(`/schools/${schoolSlug}`);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="text-center">
          <h2 className="text-2xl font-bold">Find Your School</h2>
          <p className="text-sm text-gray-500 mt-1">
            Search for your school to browse uniforms and accessories
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="relative mb-6">
            <Input
              placeholder="Search by school name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Icon icon="lucide:search" />}
              size="lg"
              className="w-full"
            />
          </div>
          
          {schools === undefined ? (
            <div className="flex justify-center py-8">
              <Spinner size="lg" />
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-8">
              <Icon icon="lucide:school" className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                {searchTerm.length > 2
                  ? "No schools found. Try a different search term."
                  : "Enter a school name to find uniforms for your school."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schools.map((school) => (
                <Card 
                  key={school._id}
                  isPressable
                  className="p-4 hover:border-primary"
                  onPress={() => handleSchoolSelect(school.slug)}
                >
                  <div className="flex items-center">
                    {school.logoUrl ? (
                      <img 
                        src={school.logoUrl} 
                        alt={school.name} 
                        className="w-12 h-12 object-contain mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <Icon icon="lucide:school" className="w-6 h-6 text-primary-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{school.name}</h3>
                      <p className="text-sm text-gray-500">{school.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" onPress={onClose}>
            Close
          </Button>
          <Button 
            color="primary" 
            as="a" 
            href="/schools"
            onPress={() => onClose()}
          >
            View All Schools
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
