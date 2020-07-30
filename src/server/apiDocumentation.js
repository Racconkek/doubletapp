module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Students',
        description: 'Тестовое задание для Doubletapp.' +
            ' Single Page Application для работы со списком студентов: добавлением, удалением, получением.' +
            ' В основе Express.js, React и база данных MongoDB, а само приложение в облаке Heroku.',
        contact: {
            name: 'Мирошниченко Людмила',
            email: 'Lyuda-mirosh@mail.ru'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Local server'
        },
        {
            url: 'https://doubletapp-students.herokuapp.com/',
            description: 'Production server'
        }
    ],
    paths: {
        '/api/students': {
            get: {
                description: 'Get students',
                operationId: 'getStudents',
                responses: {
                    200: {
                        description: 'Students were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Students'
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Database unexpected error'
                    }
                }
            }
        },
        '/api/specialties': {
            get: {
                description: 'Get specialties',
                operationId: 'getSpecialties',
                responses: {
                    200: {
                        description: 'Specialties were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Specialties'
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Database unexpected error'
                    }
                }
            }
        },
        '/api/add': {
            post: {
                description: 'Add new student to students list',
                operationId: 'addStudent',
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                $ref: '#/components/schemas/StudentFormData'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Ok'
                    },
                    500: {
                        description: 'Database unexpected error'
                    }
                }
            }
        },
        '/api/delete/{id}': {
            delete: {
                description: 'Delete student from students list',
                operationId: 'deleteStudent',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'string'
                        },
                        required: true
                    }
                ],
                responses: {
                    200: {
                        description: 'Student deleted'
                    },
                    500: {
                        description: 'Database unexpected error'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Student: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'Student identification number',
                        example: '5f22c2612856830018221347'
                    },
                    name: {
                        type: 'string',
                        example: 'Иванов Иван'
                    },
                    email: {
                        type: 'string',
                        example: 'ivanov@mail.ru'
                    },
                    age: {
                        type: 'string',
                        example: '20'
                    },
                    specialty: {
                        type: 'string',
                        example: 'Прикладная информатика'
                    },
                    group: {
                        type: 'string',
                        example: 'ПИ-101'
                    },
                    rating: {
                        type: 'string',
                        example: '90'
                    },
                    sex: {
                        type: 'string',
                        example: 'male'
                    },
                    color: {
                        type: 'string',
                        example: 'color1'
                    },
                    photo: {
                        type: 'string',
                        example: 'ivan-1596113502926.png'
                    }
                }
            },
            Students: {
                type: 'object',
                properties: {
                    students: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Student'
                        }
                    }
                }
            },
            Specialty: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: 'Specialty identification number',
                        example: '5f22c2612856830018221347'
                    },
                    name: {
                        type: 'string',
                        example: 'Прикладная информатика'
                    },
                    groups: {
                        type: 'array',
                        items: {
                            type: 'string',
                            example: 'Пи-101'
                        }
                    }
                }
            },
            Specialties: {
                type: 'object',
                properties: {
                    specialties: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Specialty'
                        }
                    }
                }
            },
            StudentFormData: {
                type: 'object',
                properties: {
                    userPhoto: {
                        type: 'string',
                        format: 'binary'
                    },
                    userInfo: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                example: 'Иванов Иван'
                            },
                            email: {
                                type: 'string',
                                example: 'ivanov@mail.ru'
                            },
                            age: {
                                type: 'string',
                                example: '20'
                            },
                            specialty: {
                                type: 'string',
                                example: 'Прикладная информатика'
                            },
                            group: {
                                type: 'string',
                                example: 'ПИ-101'
                            },
                            rating: {
                                type: 'string',
                                example: '90'
                            },
                            sex: {
                                type: 'string',
                                example: 'male'
                            },
                            color: {
                                type: 'string',
                                example: 'color1'
                            },
                            photo: {
                                type: 'string',
                                example: 'ivan-1596113502926.png'
                            }
                        }
                    }
                }
            }
        }
    }
};
