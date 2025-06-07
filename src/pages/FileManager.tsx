import React, { useState, useRef, DragEvent } from 'react';
import { Upload, Search, Eye, Download, Trash2, File, Image, Video, FileText, Folder, Grid3X3, List } from 'lucide-react';
import Card from '../components/UI/Card';

interface FileItem {
    id: string;
    name: string;
    type: 'image' | 'video' | 'doc' | 'campaign-asset';
    size: string;
    uploadDate: string;
    uploadedBy: string;
    linkedCampaign?: string;
    url?: string;
    thumbnail?: string;
}

const FileManager: React.FC = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const categories = [
        { id: 'all', name: 'All Files', icon: Folder },
        { id: 'image', name: 'Images', icon: Image },
        { id: 'video', name: 'Videos', icon: Video },
        { id: 'doc', name: 'Documents', icon: FileText },
        { id: 'campaign-asset', name: 'Campaign Assets', icon: File },
    ];

    // Sample files data
    const files: FileItem[] = [
        {
            id: '1',
            name: 'product-launch-hero.jpg',
            type: 'image',
            size: '2.4 MB',
            uploadDate: '2024-01-15',
            uploadedBy: 'John Doe',
            linkedCampaign: 'Q1 Product Launch',
            thumbnail: '/api/placeholder/200/150'
        },
        {
            id: '2',
            name: 'brand-video-final.mp4',
            type: 'video',
            size: '45.2 MB',
            uploadDate: '2024-01-14',
            uploadedBy: 'Sarah Smith',
            linkedCampaign: 'Brand Awareness',
            thumbnail: '/api/placeholder/200/150'
        },
        {
            id: '3',
            name: 'campaign-guidelines.pdf',
            type: 'doc',
            size: '1.1 MB',
            uploadDate: '2024-01-13',
            uploadedBy: 'Mike Johnson',
            linkedCampaign: 'Style Guide Update'
        },
        {
            id: '4',
            name: 'social-media-template.psd',
            type: 'campaign-asset',
            size: '12.8 MB',
            uploadDate: '2024-01-12',
            uploadedBy: 'Emma Wilson',
            linkedCampaign: 'Social Templates'
        },
        {
            id: '5',
            name: 'customer-testimonial.jpg',
            type: 'image',
            size: '1.8 MB',
            uploadDate: '2024-01-11',
            uploadedBy: 'Tom Brown',
            linkedCampaign: 'Customer Stories',
            thumbnail: '/api/placeholder/200/150'
        },
        {
            id: '6',
            name: 'product-demo.mov',
            type: 'video',
            size: '89.5 MB',
            uploadDate: '2024-01-10',
            uploadedBy: 'Lisa Davis',
            linkedCampaign: 'Product Demo Series',
            thumbnail: '/api/placeholder/200/150'
        }
    ];

    const filteredFiles = files.filter(file => {
        const matchesCategory = selectedCategory === 'all' || file.type === selectedCategory;
        const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.linkedCampaign?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFileUpload(droppedFiles);
    };

    const handleFileUpload = (files: File[]) => {
        console.log('Uploading files:', files);
        // Here you would handle the actual file upload
        // For demo purposes, we're just logging
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFileUpload(selectedFiles);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const toggleFileSelection = (fileId: string) => {
        setSelectedFiles(prev =>
            prev.includes(fileId)
                ? prev.filter(id => id !== fileId)
                : [...prev, fileId]
        );
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image': return Image;
            case 'video': return Video;
            case 'doc': return FileText;
            default: return File;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const FileCard: React.FC<{ file: FileItem }> = ({ file }) => {
        const FileIcon = getFileIcon(file.type);
        const isSelected = selectedFiles.includes(file.id);

        return (
            <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
            >
                <div
                    className="p-4 space-y-4"
                    onClick={() => toggleFileSelection(file.id)}
                >
                    {/* File Preview */}
                    <div className="relative">
                        {file.thumbnail ? (
                            <img
                                src={file.thumbnail}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded-lg bg-gray-200 dark:bg-gray-700"
                            />
                        ) : (
                            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <FileIcon className="w-12 h-12 text-gray-400" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-1">
                            <button
                                className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Preview file:', file.id);
                                }}
                            >
                                <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                                className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Download file:', file.id);
                                }}
                            >
                                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                                className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Delete file:', file.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate" title={file.name}>
                            {file.name}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <div className="flex justify-between">
                                <span>Size:</span>
                                <span>{file.size}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Uploaded:</span>
                                <span>{formatDate(file.uploadDate)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>By:</span>
                                <span>{file.uploadedBy}</span>
                            </div>
                            {file.linkedCampaign && (
                                <div className="pt-1">
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                                        {file.linkedCampaign}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    const FileRow: React.FC<{ file: FileItem }> = ({ file }) => {
        const FileIcon = getFileIcon(file.type);
        const isSelected = selectedFiles.includes(file.id);

        return (
            <tr
                className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                onClick={() => toggleFileSelection(file.id)}
            >
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                        {file.thumbnail ? (
                            <img
                                src={file.thumbnail}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <FileIcon className="w-5 h-5 text-gray-400" />
                            </div>
                        )}
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{file.size}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {file.uploadedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {file.linkedCampaign || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(file.uploadDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                        <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Preview file:', file.id);
                            }}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Download file:', file.id);
                            }}
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            className="text-gray-400 hover:text-red-600"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete file:', file.id);
                            }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        File Manager
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Manage and organize your marketing assets and campaign files
                    </p>
                </div>

                {/* Upload Area */}
                <Card className="mb-6">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragActive
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Upload Files
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Drag and drop files here, or click to browse
                        </p>
                        <button
                            onClick={triggerFileUpload}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            Choose Files
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileInputChange}
                            accept="image/*,video/*,.pdf,.doc,.docx,.psd,.ai"
                        />
                    </div>
                </Card>

                {/* Controls */}
                <Card className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search files..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <category.icon className="w-4 h-4" />
                                            <span>{category.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {selectedFiles.length > 0 && (
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {selectedFiles.length} file(s) selected
                                </span>
                            )}

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                                        ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                                        ? 'bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Files Display */}
                <Card>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredFiles.map(file => (
                                <FileCard key={file.id} file={file} />
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            File
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Uploaded By
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredFiles.map(file => (
                                        <FileRow key={file.id} file={file} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredFiles.length === 0 && (
                        <div className="text-center py-12">
                            <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files found</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {searchTerm || selectedCategory !== 'all'
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Upload some files to get started.'}
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default FileManager;