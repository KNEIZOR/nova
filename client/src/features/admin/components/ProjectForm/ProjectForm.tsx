import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { projectsAdminApi, type Project } from '../../api/projectsApi';

import {
    projectFormSchema,
    type ProjectFormValues,
} from '../../schema/projectSchema';

import './ProjectForm.scss';

interface ProjectFormProps {
    project: Project | null;
    onSuccess: (project: Project) => void;
    onClose: () => void;
}

export function ProjectForm({ project, onSuccess, onClose }: ProjectFormProps) {
    const [serverError, setServerError] = useState('');

    const isEditing = project !== null;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),

        defaultValues: {
            title: '',
            slug: '',
            description: '',
            city: '',
            area: 1,
            category: '',
            image: '',
            images: [],
            isPublished: true,
            sortOrder: 0,
        },
    });

    const images = watch('images');

    useEffect(() => {
        if (!project) {
            reset({
                title: '',
                slug: '',
                description: '',
                city: '',
                area: 1,
                category: '',
                image: '',
                images: [],
                isPublished: true,
                sortOrder: 0,
            });

            return;
        }

        reset({
            title: project.title,
            slug: project.slug,
            description: project.description,
            city: project.city,
            area: project.area,
            category: project.category,
            image: project.image,
            images: project.images,
            isPublished: project.isPublished,
            sortOrder: project.sortOrder,
        });
    }, [project, reset]);

    const handleAddImage = () => {
        setValue('images', [...images, '']);
    };

    const handleRemoveImage = (index: number) => {
        setValue(
            'images',
            images.filter((_, imageIndex) => imageIndex !== index),
        );
    };

    const handleImageChange = (index: number, value: string) => {
        setValue(
            'images',
            images.map((image, imageIndex) =>
                imageIndex === index ? value : image,
            ),
        );
    };

    const onSubmit = async (values: ProjectFormValues) => {
        setServerError('');

        try {
            const payload = {
                ...values,

                title: values.title.trim(),
                slug: values.slug.trim(),
                description: values.description.trim(),
                city: values.city.trim(),
                category: values.category.trim(),
                image: values.image.trim(),

                images: values.images
                    .map((image) => image.trim())
                    .filter(Boolean),
            };

            const result = isEditing
                ? await projectsAdminApi.update(project.id, payload)
                : await projectsAdminApi.create(payload);

            onSuccess(result);
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'Не удалось сохранить проект',
            );
        }
    };

    return (
        <div
            className="project-modal"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="project-modal__content">
                <header className="project-modal__header">
                    <div>
                        <span>
                            {isEditing ? 'EDIT PROJECT' : 'NEW PROJECT'}
                        </span>

                        <h2>
                            {isEditing
                                ? 'Редактировать проект'
                                : 'Новый проект'}
                        </h2>
                    </div>

                    <button type="button" onClick={onClose}>
                        ×
                    </button>
                </header>

                <form
                    className="project-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="project-form__grid">
                        <div className="project-form__field">
                            <label htmlFor="title">Название</label>

                            <input
                                id="title"
                                {...register('title')}
                                placeholder="Квартира в центре"
                            />

                            {errors.title && (
                                <span>{errors.title.message}</span>
                            )}
                        </div>

                        <div className="project-form__field">
                            <label htmlFor="slug">Slug</label>

                            <input
                                id="slug"
                                {...register('slug')}
                                placeholder="kvartira-v-centre"
                            />

                            {errors.slug && <span>{errors.slug.message}</span>}
                        </div>

                        <div className="project-form__field">
                            <label htmlFor="city">Город</label>

                            <input
                                id="city"
                                {...register('city')}
                                placeholder="Москва"
                            />

                            {errors.city && <span>{errors.city.message}</span>}
                        </div>

                        <div className="project-form__field">
                            <label htmlFor="area">Площадь, м²</label>

                            <input
                                id="area"
                                type="number"
                                min="1"
                                {...register('area', {
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.area && <span>{errors.area.message}</span>}
                        </div>

                        <div className="project-form__field">
                            <label htmlFor="category">Категория</label>

                            <input
                                id="category"
                                {...register('category')}
                                placeholder="Современный интерьер"
                            />

                            {errors.category && (
                                <span>{errors.category.message}</span>
                            )}
                        </div>

                        <div className="project-form__field">
                            <label htmlFor="sortOrder">Порядок</label>

                            <input
                                id="sortOrder"
                                type="number"
                                {...register('sortOrder', {
                                    valueAsNumber: true,
                                })}
                            />

                            {errors.sortOrder && (
                                <span>{errors.sortOrder.message}</span>
                            )}
                        </div>

                        <div className="project-form__field project-form__field--full">
                            <label htmlFor="description">Описание</label>

                            <textarea
                                id="description"
                                rows={7}
                                {...register('description')}
                                placeholder="Расскажите о проекте..."
                            />

                            {errors.description && (
                                <span>{errors.description.message}</span>
                            )}
                        </div>

                        <div className="project-form__field project-form__field--full">
                            <label htmlFor="image">Главное изображение</label>

                            <input
                                id="image"
                                {...register('image')}
                                placeholder="https://images.unsplash.com/..."
                            />

                            {errors.image && (
                                <span>{errors.image.message}</span>
                            )}

                            <div className="project-form__preview">
                                <img
                                    src={project?.image || ''}
                                    alt=""
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            'none';
                                    }}
                                />
                            </div>
                        </div>

                        <div className="project-form__field project-form__field--full">
                            <div className="project-form__images-header">
                                <label>Дополнительные изображения</label>

                                <button type="button" onClick={handleAddImage}>
                                    + Добавить
                                </button>
                            </div>

                            <div className="project-form__images">
                                {images.map((image, index) => (
                                    <div
                                        className="project-form__image-row"
                                        key={index}
                                    >
                                        <input
                                            value={image}
                                            onChange={(event) =>
                                                handleImageChange(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="https://images.unsplash.com/..."
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label className="project-form__checkbox">
                            <input
                                type="checkbox"
                                {...register('isPublished')}
                            />

                            <span>Опубликован на сайте</span>
                        </label>
                    </div>

                    {serverError && (
                        <div className="project-form__server-error">
                            {serverError}
                        </div>
                    )}

                    <footer className="project-form__footer">
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Сохраняем...' : 'Сохранить проект'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
