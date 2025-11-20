import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentManager = ({ documents, onAddDocument, onDeleteDocument }) => {
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'passport',
    expiryDate: '',
    notes: ''
  });

  const documentTypes = [
    { value: 'passport', label: 'Passport', icon: 'BookOpen' },
    { value: 'visa', label: 'Visa', icon: 'FileText' },
    { value: 'ticket', label: 'Flight Ticket', icon: 'Plane' },
    { value: 'hotel', label: 'Hotel Booking', icon: 'Bed' },
    { value: 'insurance', label: 'Travel Insurance', icon: 'Shield' },
    { value: 'vaccination', label: 'Vaccination Certificate', icon: 'Heart' },
    { value: 'license', label: 'Driver\'s License', icon: 'Car' },
    { value: 'other', label: 'Other', icon: 'File' }
  ];

  const getDocumentIcon = (type) => {
    const docType = documentTypes?.find(dt => dt?.value === type);
    return docType ? docType?.icon : 'File';
  };

  const getDocumentColor = (type) => {
    const colors = {
      passport: 'text-blue-600 bg-blue-50',
      visa: 'text-green-600 bg-green-50',
      ticket: 'text-purple-600 bg-purple-50',
      hotel: 'text-orange-600 bg-orange-50',
      insurance: 'text-red-600 bg-red-50',
      vaccination: 'text-pink-600 bg-pink-50',
      license: 'text-indigo-600 bg-indigo-50',
      other: 'text-gray-600 bg-gray-50'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50';
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const handleAddDocument = () => {
    if (newDocument?.name && newDocument?.type) {
      onAddDocument({
        ...newDocument,
        id: Date.now(),
        uploadDate: new Date()?.toISOString()?.split('T')?.[0]
      });
      setNewDocument({
        name: '',
        type: 'passport',
        expiryDate: '',
        notes: ''
      });
      setIsAddingDocument(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No expiry date';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Travel Documents</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingDocument(!isAddingDocument)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Document
        </Button>
      </div>
      {/* Add Document Form */}
      {isAddingDocument && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h4 className="text-md font-medium text-foreground mb-4">Add New Document</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Document Name"
              type="text"
              placeholder="e.g., US Passport"
              value={newDocument?.name}
              onChange={(e) => setNewDocument({ ...newDocument, name: e?.target?.value })}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Document Type</label>
              <select
                value={newDocument?.type}
                onChange={(e) => setNewDocument({ ...newDocument, type: e?.target?.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {documentTypes?.map((type) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Expiry Date (Optional)"
              type="date"
              value={newDocument?.expiryDate}
              onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e?.target?.value })}
            />
            <Input
              label="Notes (Optional)"
              type="text"
              placeholder="Additional notes..."
              value={newDocument?.notes}
              onChange={(e) => setNewDocument({ ...newDocument, notes: e?.target?.value })}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <Button variant="default" onClick={handleAddDocument}>
              Add Document
            </Button>
            <Button variant="outline" onClick={() => setIsAddingDocument(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Document List */}
      <div className="space-y-3">
        {documents?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No documents uploaded yet</p>
            <p className="text-sm">Add your travel documents to keep them organized</p>
          </div>
        ) : (
          documents?.map((document) => (
            <div key={document?.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${getDocumentColor(document?.type)}`}>
                  <Icon name={getDocumentIcon(document?.type)} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{document?.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {documentTypes?.find(dt => dt?.value === document?.type)?.label}
                    </span>
                    {document?.expiryDate && (
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        isExpired(document?.expiryDate)
                          ? 'bg-destructive/10 text-destructive'
                          : isExpiringSoon(document?.expiryDate)
                          ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
                      }`}>
                        {isExpired(document?.expiryDate)
                          ? 'Expired'
                          : isExpiringSoon(document?.expiryDate)
                          ? 'Expires Soon' :'Valid'
                        } • {formatDate(document?.expiryDate)}
                      </span>
                    )}
                  </div>
                  {document?.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{document?.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Download">
                  Download
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteDocument(document?.id)}
                  iconName="Trash2"
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" size="sm" iconName="Upload" className="text-xs">
            Bulk Upload
          </Button>
          <Button variant="outline" size="sm" iconName="Share2" className="text-xs">
            Share Documents
          </Button>
          <Button variant="outline" size="sm" iconName="Cloud" className="text-xs">
            Backup to Cloud
          </Button>
          <Button variant="outline" size="sm" iconName="Printer" className="text-xs">
            Print All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;